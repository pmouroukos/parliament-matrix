import type { Party, PartyId } from "@/types/parliament";
import { usePrefs } from "@/lib/prefs";

type PartyFiltersProps = {
  parties: Party[];
  selected: PartyId[];
  onToggle: (partyId: PartyId) => void;
  onSelectAll: () => void;
};

export function PartyFilters({
  parties,
  selected,
  onToggle,
  onSelectAll,
}: PartyFiltersProps) {
  const { t } = usePrefs();
  const allSelected = selected.length === parties.length;

  return (
    <div role="group" aria-label={t.partyFilters} className="flex flex-wrap items-center gap-2">
      {parties.map((party) => {
        const active = selected.includes(party.id);
        return (
          <button
            key={party.id}
            type="button"
            onClick={() => onToggle(party.id)}
            aria-pressed={active}
            title={party.fullName}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              active ? "text-white" : "border-line bg-transparent text-muted hover:border-muted"
            }`}
            style={active ? { backgroundColor: party.accent, borderColor: party.accent } : undefined}
          >
            {party.shortName}
          </button>
        );
      })}
      {!allSelected && (
        <button
          type="button"
          onClick={onSelectAll}
          className="px-2 py-1.5 text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          {t.allParties}
        </button>
      )}
    </div>
  );
}
