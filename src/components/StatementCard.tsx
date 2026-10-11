
import type { Party, Statement } from "@/types/parliament";
import { statementDate } from "@/lib/statement-filters";

type StatementCardProps = {
  statement: Statement;
  party?: Party;
};

function formatDate(value: string): string {
  const calendarDate = statementDate(value);
  if (!calendarDate) {
    return "Δεν αναφέρεται";
  }

  const date = new Date(`${calendarDate}T00:00:00Z`);

  return new Intl.DateTimeFormat("el-GR", {
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
  const partyName = party?.shortName ?? statement.partyId;
  const hasQuote = Boolean(statement.quote?.trim());
  const hasSource = isValidSourceUrl(statement.sourceUrl);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(28,25,23,0.06)]">
      {/* Κόμμα */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="break-words text-base font-bold"
            style={{ color: party?.accent ?? "#1b2a4a" }}
          >
            {partyName}
          </p>

          {party?.fullName &&
            party.fullName !== party.shortName && (
              <p className="mt-1 text-xs text-stone-500">
                {party.fullName}
              </p>
            )}
        </div>

        {statement.placeholder && (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-900">
            Placeholder
          </span>
        )}
      </div>

      {/* Υποκατηγορία */}
      {statement.subcategory && (
        <div className="mt-4 rounded-xl bg-[#f4f1ea] px-4 py-3">
          <p className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            Υποκατηγορία
          </p>

          <h3 className="mt-1 break-words font-serif text-lg font-semibold text-[#1b2a4a]">
            {statement.subcategory}
          </h3>
        </div>
      )}

      <dl className="mt-4 space-y-4 text-sm">
        {/* Περίληψη */}
        <div>
          <dt className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            Περίληψη
          </dt>
          <dd className="mt-1 break-words leading-relaxed text-stone-800">
            {statement.summary}
          </dd>
        </div>

        {/* Παράθεση */}
        <div>
          <dt className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            Παράθεση
          </dt>

          {hasQuote ? (
            <dd className="mt-2 break-words border-l-2 border-[#d4b072] pl-3 font-serif text-[15px] leading-relaxed text-stone-700 italic">
              «{statement.quote}»
            </dd>
          ) : (
            <dd className="mt-1 text-xs text-stone-500">
              Δεν υπάρχει διαθέσιμη ακριβής παράθεση.
            </dd>
          )}
        </div>

        {/* Ομιλητής και ημερομηνία */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
              Ομιλητής
            </dt>
            <dd className="mt-1 break-words font-medium text-stone-900">
              {statement.speaker}
            </dd>
            <dd className="text-xs text-stone-500">
              {statement.role}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
              Ημερομηνία
            </dt>
            <dd className="mt-1 text-stone-800">
              {formatDate(statement.date)}
            </dd>
          </div>
        </div>

        {/* Πηγή */}
        <div>
          <dt className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            Πηγή
          </dt>

          <dd className="mt-1">
            {hasSource ? (
              <a
                href={statement.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-medium text-[#1b2a4a] underline underline-offset-2 hover:text-[#0f1b33]"
              >
                Προβολή πηγής ↗
              </a>
            ) : (
              <span className="text-xs text-stone-500">
                Δεν υπάρχει διαθέσιμος σύνδεσμος πηγής.
              </span>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}
