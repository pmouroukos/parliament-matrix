
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
import { PLACEHOLDER_BANNER } from "@/data/copy";
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
            : "Σφάλμα φόρτωσης δεδομένων."
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

  const topic = topics.find((item) => item.id === topicId);

  const subcategories = useMemo(() => [...new Set(statements
    .filter((statement) => statement.topicId === topicId)
    .map((statement) => statement.subcategory?.trim() ?? "")
    .filter(Boolean))].sort((a, b) => a.localeCompare(b, "el")), [statements, topicId]);

  const visibleStatements = useMemo(
    () => filterStatements(statements, topicId, selectedParties, filters),
    [statements, selectedParties, topicId, filters]
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
    <div className="min-h-screen overflow-x-hidden bg-[#f4f1ea] text-[#1c1917]">
      <header className="border-b border-[#d6d0c4] bg-[#1b2a4a] text-[#f8f4ec]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#d4b072] uppercase">
            «Οι πολιτικές θέσεις, ξεκάθαρα και συγκεντρωμένα.»
</p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight sm:text-4xl">
              Parliament Matrix
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-[#d7dde8]">
              Σύγκριση θέσεων κομμάτων της Βουλής των Ελλήνων ανά θέμα,
              με περίληψη, παράθεση, ομιλητή, ημερομηνία και πηγή.
            </p>
          </div>

          <p className="rounded-full border border-[#d4b072]/50 bg-[#24365c] px-3 py-1 text-xs text-[#f1e3c4]">
            {mockMode
              ? "Τοπικά δεδομένα υπόδειγμα"
              : "Δεδομένα από Supabase"}
          </p>
        </div>
      </header>

      {mockMode && (
        <div className="border-b border-amber-300 bg-amber-100 px-4 py-2.5 text-center text-sm font-medium text-amber-950 sm:px-6">
          {PLACEHOLDER_BANNER}
        </div>
      )}

      {!mockMode && !loading && !error && (
        <div className="border-b border-stone-200 bg-stone-100 px-4 py-2 text-center text-xs text-stone-700">
          Οι καταχωρίσεις προέρχονται από τη βάση δεδομένων.
          Ελέγξτε τις πρωτογενείς πηγές πριν τις θεωρήσετε επαληθευμένες.
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[15rem_minmax(0,1fr)]">
        {loading ? (
          <div className="md:col-span-2">
            Φόρτωση πολιτικών θέσεων...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="md:col-span-2 rounded-xl border border-red-300 bg-red-50 p-5 text-red-800"
          >
            Σφάλμα σύνδεσης: {error}
          </div>
        ) : topics.length === 0 ? (
          <div className="md:col-span-2 rounded-xl bg-white p-6">
            Δεν υπάρχουν διαθέσιμες πολιτικές θέσεις στη βάση.
          </div>
        ) : (
          <>
            <TopicSidebar
              topics={topics}
              activeTopicId={topicId}
              onSelect={selectTopic}
            />

            <section className="min-w-0">
              <div className="mb-5">
                <h2 className="break-words font-serif text-2xl">
                  {topic?.label ?? "Επιλογή θέματος"}
                </h2>

                <p className="mt-1 text-sm text-stone-600">
                  {topic?.description}
                </p>
              </div>

              <PartyFilters
                parties={parties}
                selected={selectedParties}
                onToggle={toggleParty}
                onSelectAll={selectAllParties}
              />

              <StatementFilters filters={filters} subcategories={subcategories}
                invalidRange={invalidRange} onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)} />
              <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 text-sm text-stone-600">
                Εμφανίζονται {visibleStatements.length} από {statements.length} δηλώσεις
              </p>

              {visibleStatements.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white/70 p-8 text-center text-stone-600">
                  <p>Δεν βρέθηκαν δηλώσεις με αυτά τα κριτήρια.</p>
                  <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-3 rounded-lg px-3 py-2 font-medium text-[#1b2a4a] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b2a4a]">
                    Καθαρισμός φίλτρων
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-2">
                  {visibleStatements.map((statement) => (
                    <div key={statement.id} className="min-w-0">
                      <StatementCard
                        statement={statement}
                        party={parties.find(
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
