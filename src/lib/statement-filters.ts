import type { Statement } from "@/types/parliament";

export type StatementSort = "original" | "newest" | "oldest";
export type AdvancedFilters = {
  search: string;
  subcategory: string;
  startDate: string;
  endDate: string;
  sort: StatementSort;
};

export const DEFAULT_FILTERS: AdvancedFilters = {
  search: "", subcategory: "", startDate: "", endDate: "", sort: "original",
};

export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "")
    .toLocaleLowerCase("el-GR").replace(/ς/g, "σ").replace(/\s+/g, " ").trim();
}

// Compare the calendar date written in the source, without timezone conversion.
// Accept ISO dates/timestamps only; reject ambiguous dates and impossible days.
export function statementDate(value: string): string | null {
  const input = value.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(input);
  if (!match) return null;
  const [, year, month, day] = match;
  const key = `${year}-${month}-${day}`;
  const parsed = new Date(`${key}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== key) return null;
  if (input !== key && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?$/.test(input)) return null;
  if (input !== key && Number.isNaN(Date.parse(input))) return null;
  return key;
}

export function filterStatements(
  statements: Statement[], topicId: string, partyIds: string[], filters: AdvancedFilters,
): Statement[] {
  const query = normalizeSearch(filters.search);
  if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) return [];
  const matches = statements.map((statement, index) => ({
    statement, index, date: statementDate(statement.date),
  })).filter(({ statement, date }) => {
    if (statement.topicId !== topicId || !partyIds.includes(statement.partyId)) return false;
    if (filters.subcategory && statement.subcategory?.trim() !== filters.subcategory) return false;
    if (query && ![statement.summary, statement.quote, statement.speaker]
      .some((value) => normalizeSearch(value).includes(query))) return false;
    if (filters.startDate || filters.endDate) {
      if (!date) return false;
      if (filters.startDate && date < filters.startDate) return false;
      if (filters.endDate && date > filters.endDate) return false;
    }
    return true;
  });
  if (filters.sort !== "original") {
    matches.sort((a, b) => {
      if (!a.date && b.date) return 1;
      if (a.date && !b.date) return -1;
      const comparison = a.date && b.date ? a.date.localeCompare(b.date) : 0;
      return (filters.sort === "newest" ? -comparison : comparison) || a.index - b.index;
    });
  }
  return matches.map(({ statement }) => statement);
}
