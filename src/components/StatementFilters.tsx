import type { AdvancedFilters, StatementSort } from "@/lib/statement-filters";
import { DEFAULT_FILTERS } from "@/lib/statement-filters";
import { usePrefs } from "@/lib/prefs";

type Props = {
  filters: AdvancedFilters;
  subcategories: string[];
  invalidRange: boolean;
  onChange: (filters: AdvancedFilters) => void;
  onReset: () => void;
};

/* One row of fields, labels kept for screen readers only: the placeholders say what each one is. */
const control = "w-full min-w-0 rounded-lg border border-line bg-field px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [color-scheme:dark]";

export function StatementFilters({ filters, subcategories, invalidRange, onChange, onReset }: Props) {
  const { t } = usePrefs();
  const changed = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div className="mt-5 rounded-xl border border-line bg-panel p-3">
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
        <label htmlFor="statement-search" className="min-w-0">
          <span className="sr-only">{t.search}</span>
          <input id="statement-search" type="search" value={filters.search}
            placeholder={t.searchPlaceholder}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            className={control} />
        </label>
        <label htmlFor="statement-start" className="min-w-0">
          <span className="sr-only">{t.from}</span>
          <input id="statement-start" type="date" value={filters.startDate} className={control} title={t.from}
            aria-invalid={invalidRange} aria-describedby={invalidRange ? "statement-date-error" : undefined}
            onChange={(event) => onChange({ ...filters, startDate: event.target.value })} />
        </label>
        <label htmlFor="statement-end" className="min-w-0">
          <span className="sr-only">{t.to}</span>
          <input id="statement-end" type="date" value={filters.endDate} className={control} title={t.to}
            aria-invalid={invalidRange} aria-describedby={invalidRange ? "statement-date-error" : undefined}
            onChange={(event) => onChange({ ...filters, endDate: event.target.value })} />
        </label>
        <label htmlFor="statement-sort" className="min-w-0">
          <span className="sr-only">{t.sort}</span>
          <select id="statement-sort" value={filters.sort} className={control}
            onChange={(event) => onChange({ ...filters, sort: event.target.value as StatementSort })}>
            <option value="original">{t.sortOriginal}</option>
            <option value="newest">{t.sortNewest}</option>
            <option value="oldest">{t.sortOldest}</option>
          </select>
        </label>
        {subcategories.length > 0 && (
          <label htmlFor="statement-subcategory" className="min-w-0 xl:col-span-2">
            <span className="sr-only">{t.subcategory}</span>
            <select id="statement-subcategory" value={filters.subcategory} className={control}
              onChange={(event) => onChange({ ...filters, subcategory: event.target.value })}>
              <option value="">{t.allSubcategories}</option>
              {subcategories.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        )}
      </div>
      {invalidRange && <p id="statement-date-error" role="alert" className="mt-3 text-sm text-red-500">{t.badRange}</p>}
      {changed && <div className="mt-2 flex justify-end"><button type="button" onClick={onReset} className="px-2 py-1 text-sm font-medium text-muted underline underline-offset-2 hover:text-foreground">{t.resetFilters}</button></div>}
    </div>
  );
}
