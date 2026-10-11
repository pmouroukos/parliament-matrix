import type { AdvancedFilters, StatementSort } from "@/lib/statement-filters";

type Props = {
  filters: AdvancedFilters;
  subcategories: string[];
  invalidRange: boolean;
  onChange: (filters: AdvancedFilters) => void;
  onReset: () => void;
};

const control = "mt-1 w-full min-w-0 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b2a4a]";
const button = "rounded-lg px-2 py-1 text-sm font-medium text-[#1b2a4a] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b2a4a]";

export function StatementFilters({ filters, subcategories, invalidRange, onChange, onReset }: Props) {
  return (
    <div className="mt-5 rounded-xl border border-stone-200 bg-white/70 p-4">
      <label htmlFor="statement-search" className="text-xs font-semibold text-stone-600">Αναζήτηση δηλώσεων</label>
      <div className="flex flex-wrap items-center gap-2">
        <input id="statement-search" type="search" value={filters.search}
          placeholder="Αναζήτηση σε δηλώσεις, αποσπάσματα ή ομιλητές..."
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          className={`${control} flex-1 basis-64`} />
        {filters.search && <button type="button" onClick={() => onChange({ ...filters, search: "" })} className={button}>Καθαρισμός αναζήτησης</button>}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {subcategories.length > 0 && (
          <label className="min-w-0 text-xs font-semibold text-stone-600" htmlFor="statement-subcategory">
            Υποκατηγορία
            <select id="statement-subcategory" value={filters.subcategory} className={control}
              onChange={(event) => onChange({ ...filters, subcategory: event.target.value })}>
              <option value="">Όλες οι υποκατηγορίες</option>
              {subcategories.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        )}
        <label htmlFor="statement-start" className="min-w-0 text-xs font-semibold text-stone-600">
          Από ημερομηνία
          <input id="statement-start" type="date" value={filters.startDate} className={control}
            aria-invalid={invalidRange} aria-describedby={invalidRange ? "statement-date-error" : undefined}
            onChange={(event) => onChange({ ...filters, startDate: event.target.value })} />
        </label>
        <label htmlFor="statement-end" className="min-w-0 text-xs font-semibold text-stone-600">
          Έως ημερομηνία
          <input id="statement-end" type="date" value={filters.endDate} className={control}
            aria-invalid={invalidRange} aria-describedby={invalidRange ? "statement-date-error" : undefined}
            onChange={(event) => onChange({ ...filters, endDate: event.target.value })} />
        </label>
        <label htmlFor="statement-sort" className="min-w-0 text-xs font-semibold text-stone-600">
          Ταξινόμηση
          <select id="statement-sort" value={filters.sort} className={control}
            onChange={(event) => onChange({ ...filters, sort: event.target.value as StatementSort })}>
            <option value="original">Αρχική σειρά</option>
            <option value="newest">Νεότερες πρώτα</option>
            <option value="oldest">Παλαιότερες πρώτα</option>
          </select>
        </label>
      </div>
      {invalidRange && <p id="statement-date-error" role="alert" className="mt-3 text-sm text-red-800">Η ημερομηνία έναρξης πρέπει να είναι πριν ή ίδια με την ημερομηνία λήξης.</p>}
      <div className="mt-3 flex justify-end"><button type="button" onClick={onReset} className={button}>Καθαρισμός φίλτρων</button></div>
    </div>
  );
}
