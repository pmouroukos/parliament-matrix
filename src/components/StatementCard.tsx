
import type { Party, Statement } from "@/types/parliament";
import { statementDate } from "@/lib/statement-filters";
import { usePrefs, type Lang } from "@/lib/prefs";

type StatementCardProps = {
  statement: Statement;
  party?: Party;
};

function formatDate(value: string, lang: Lang, none: string): string {
  const calendarDate = statementDate(value);
  if (!calendarDate) {
    return none;
  }

  const date = new Date(`${calendarDate}T00:00:00Z`);

  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function isValidSourceUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function StatementCard({
  statement,
  party,
}: StatementCardProps) {
  const { lang, t } = usePrefs();
  const partyName = party?.shortName ?? statement.partyId;
  const hasQuote = Boolean(statement.quote?.trim());
  const hasSource = isValidSourceUrl(statement.sourceUrl);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-panel p-5">
      <p className="break-words text-lg font-bold" style={{ color: party?.accent ?? "#ecebe6" }} title={party?.fullName}>
        {partyName}
      </p>

      {statement.subcategory && (
        <p className="mt-1 break-words text-xs font-semibold tracking-wider text-muted uppercase">
          {statement.subcategory}
        </p>
      )}

      <p className="mt-2 break-words leading-relaxed text-foreground">
        {statement.summary}
      </p>

      {hasQuote && (
        <blockquote className="mt-3 break-words rounded-lg bg-field px-4 py-3 font-serif text-[15px] leading-relaxed text-quote italic">
          {lang === "en" ? `“${statement.quote}”` : `«${statement.quote}»`}
        </blockquote>
      )}

      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-4 text-sm text-muted">
        <span className="min-w-0 break-words" title={statement.role}>{statement.speaker}</span>
        <span className="flex items-baseline gap-3">
          <span>{formatDate(statement.date, lang, t.noDate)}</span>
          {hasSource && (
            <a href={statement.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-2 hover:underline">
              {t.source} ↗
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
