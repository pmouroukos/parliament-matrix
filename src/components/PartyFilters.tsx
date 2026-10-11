import type { Party, PartyId } from "@/types/parliament";

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
  const allSelected = selected.length === parties.length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
          Φίλτρα κομμάτων
        </p>
        <button
          type="button"
          onClick={onSelectAll}
          disabled={allSelected}
          className="text-xs font-medium text-[#1b2a4a] underline-offset-2 hover:underline disabled:text-stone-400 disabled:no-underline"
        >
          Όλα τα κόμματα
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {parties.map((party) => {
          const active = selected.includes(party.id);
          return (
            <button
              key={party.id}
              type="button"
              onClick={() => onToggle(party.id)}
              aria-pressed={active}
              title={party.fullName}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                active
                  ? "text-white shadow-sm"
                  : "border-stone-300 bg-white text-stone-600 hover:border-stone-400"
              }`}
              style={
                active
                  ? { backgroundColor: party.accent, borderColor: party.accent }
                  : undefined
              }
            >
              {party.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
