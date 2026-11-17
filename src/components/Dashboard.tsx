
"use client";

import { useEffect, useMemo, useState } from "react";
import { getParliamentDataset, isUsingMockData } from "@/lib/data";
import type {
  Party,
  PartyId,
  Statement,
  Topic,
  TopicId,
} from "@/types/parliament";
import { usePrefs } from "@/lib/prefs";
import { PartyFilters } from "@/components/PartyFilters";
import { StatementCard } from "@/components/StatementCard";
import { TopicSidebar } from "@/components/TopicSidebar";
import { StatementFilters } from "@/components/StatementFilters";
import { DEFAULT_FILTERS, filterStatements, type AdvancedFilters } from "@/lib/statement-filters";

export function Dashboard() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [topicId, setTopicId] = useState<TopicId>("");
  const [selectedParties, setSelectedParties] = useState<PartyId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AdvancedFilters>(DEFAULT_FILTERS);

  const mockMode = isUsingMockData();
  const { lang, theme, t, setLang, toggleTheme } = usePrefs();

  /* The same data in the chosen language: English where the record has it, Greek otherwise. */
  const shownTopics = useMemo(() => lang === "en" ? topics.map((x) => x.en ? { ...x, ...x.en } : x) : topics, [topics, lang]);
  const shownParties = useMemo(() => lang === "en" ? parties.map((x) => x.en ? { ...x, ...x.en } : x) : parties, [parties, lang]);
  const shownStatements = useMemo(() => lang === "en" ? statements.map((x) => x.en ? { ...x, ...Object.fromEntries(Object.entries(x.en).filter(([, v]) => v)) } : x) : statements, [statements, lang]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const dataset = await getParliamentDataset();

        if (cancelled) return;

        setTopics(dataset.topics);
        setParties(dataset.parties);
        setStatements(dataset.statements);
        setTopicId(dataset.topics[0]?.id ?? "");
        setSelectedParties(dataset.parties.map((p) => p.id));
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : ""
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const topic = shownTopics.find((item) => item.id === topicId);

  const subcategories = useMemo(() => [...new Set(shownStatements
    .filter((statement) => statement.topicId === topicId)
    .map((statement) => statement.subcategory?.trim() ?? "")
    .filter(Boolean))].sort((a, b) => a.localeCompare(b, lang)), [shownStatements, topicId, lang]);

  const visibleStatements = useMemo(
    () => filterStatements(shownStatements, topicId, selectedParties, filters),
    [shownStatements, selectedParties, topicId, filters]
  );
  const invalidRange = Boolean(filters.startDate && filters.endDate && filters.startDate > filters.endDate);

  function selectTopic(nextTopicId: TopicId) {
    setTopicId(nextTopicId);
    setFilters((current) => ({ ...current, subcategory:
      statements.some((statement) => statement.topicId === nextTopicId &&
        statement.subcategory?.trim() === current.subcategory) ? current.subcategory : "" }));
  }

  function toggleParty(partyId: PartyId) {
    setSelectedParties((current) => {
      if (current.includes(partyId)) {
        if (current.length === 1) {
          return current;
        }

        return current.filter((id) => id !== partyId);
      }

      return [...current, partyId];
    });
  }

  function selectAllParties() {
    setSelectedParties(parties.map((party) => party.id));
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="bg-navy text-[#f8f4ec]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            Parliament Matrix
          </h1>
          <div className="flex items-center gap-2">
            <div role="group" aria-label={t.language} className="flex rounded-full border border-white/25 p-0.5 text-sm font-semibold">
              {(["el", "en"] as const).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1 transition ${lang === l ? "bg-[#f8f4ec] text-navy" : "text-[#f8f4ec]/75 hover:text-[#f8f4ec]"}`}>
                  {l === "el" ? "ΕΛ" : "EN"}
                </button>
              ))}
            </div>
            <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.toLight : t.toDark} title={theme === "dark" ? t.toLight : t.toDark}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-[#f8f4ec] transition hover:bg-white/10">
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mockMode && (
        <p className="border-b border-line px-4 py-2 text-center text-xs text-muted sm:px-6">
          {t.placeholderBanner}
        </p>
      )}

      {!mockMode && !loading && !error && (
        <p className="border-b border-line px-4 py-2 text-center text-xs text-muted">
          {t.liveBanner}
        </p>
      )}

      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 md:grid-cols-[15rem_minmax(0,1fr)]">
        {loading ? (
          <div className="md:col-span-2">
            {t.loading}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="md:col-span-2 rounded-xl border border-red-900 bg-red-950/40 p-5 text-red-300"
          >
            {t.loadError} {error || t.loadErrorFallback}
          </div>
        ) : topics.length === 0 ? (
          <div className="md:col-span-2 rounded-xl bg-panel p-6">
            {t.empty}
          </div>
        ) : (
          <>
            <TopicSidebar
              topics={shownTopics}
              activeTopicId={topicId}
              onSelect={selectTopic}
            />

            <section className="min-w-0">
              <h2 className="mb-4 break-words font-serif text-3xl">
                {topic?.label ?? t.pickTopic}
              </h2>

              <PartyFilters
                parties={shownParties}
                selected={selectedParties}
                onToggle={toggleParty}
                onSelectAll={selectAllParties}
              />

              <StatementFilters filters={filters} subcategories={subcategories}
                invalidRange={invalidRange} onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)} />
              <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {t.showing(visibleStatements.length, statements.length)}
              </p>

              {visibleStatements.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-line p-8 text-center text-muted">
                  <p>{t.noResults}</p>
                  <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-3 rounded-lg px-3 py-2 font-medium text-foreground underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
                    {t.resetFilters}
                  </button>
                </div>
              ) : (
                <div className="mt-5 grid min-w-0 gap-4 xl:grid-cols-2">
                  {visibleStatements.map((statement) => (
                    <div key={statement.id} className="min-w-0">
                      <StatementCard
                        statement={statement}
                        party={shownParties.find(
                          (party) => party.id === statement.partyId
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
