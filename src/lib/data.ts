import {
  getSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import type {
  Party,
  PartyId,
  Statement,
  StatementFilters,
  Topic,
  TopicId,
} from "@/types/parliament";

export type DataSource = "mock" | "supabase";

export type ParliamentDataset = {
  topics: Topic[];
  parties: Party[];
  statements: Statement[];
};

type ParliamentRow = {
  id: string | number | null;
  topic: string | null;
  party: string | null;
  summary: string | null;
  exact_quote: string | null;
  speaker: string | null;
  date: string | null;
  source_type: string | null;
  source_url: string | null;
  page: string | null;
  created_at: string | null;
  subcategory: string | null;
};

const PARTY_ACCENTS: Record<string, string> = {
  νδ: "#1d4ed8",
  "νέα δημοκρατία": "#1d4ed8",
  πασοκ: "#15803d",
  "πασοκ – κίνημα αλλαγής": "#15803d",
  συριζα: "#dc2626",
  "συριζα – π.σ.": "#dc2626",
  κκε: "#991b1b",
  "κομμουνιστικό κόμμα ελλάδας": "#991b1b",
  "ελ. λύση": "#0369a1",
  "ελληνική λύση": "#0369a1",
  "ν. αριστερά": "#be123c",
  "νέα αριστερά": "#be123c",
  πλεύση: "#6d28d9",
  "πλεύση ελευθερίας": "#6d28d9",
};

const FALLBACK_ACCENTS = [
  "#1d4ed8",
  "#15803d",
  "#dc2626",
  "#991b1b",
  "#0369a1",
  "#be123c",
  "#6d28d9",
  "#0f766e",
];

let datasetInflight: Promise<ParliamentDataset> | null = null;

export function getActiveDataSource(): DataSource {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase"
    ? "supabase"
    : "mock";
}

export function isUsingMockData(): boolean {
  return getActiveDataSource() === "mock";
}

function text(value: string | number | null | undefined): string {
  return String(value ?? "").trim();
}

function makeId(value: string): string {
  return value.normalize("NFC").trim().toLocaleLowerCase("el-GR");
}

function accentFor(name: string): string {
  const id = makeId(name);
  const known = PARTY_ACCENTS[id];
  if (known) {
    return known;
  }

  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash + id.charCodeAt(index) * (index + 1)) % FALLBACK_ACCENTS.length;
  }
  return FALLBACK_ACCENTS[hash];
}

async function fetchRows(): Promise<ParliamentRow[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are missing.");
  }

  const allRows: ParliamentRow[] = [];
  const pageSize = 1000;

  for (let start = 0; ; start += pageSize) {
    const { data, error } = await getSupabaseClient()
      .from("parliament_data")
      .select("*")
      .order("id", { ascending: true })
      .range(start, start + pageSize - 1);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    const rows = (data ?? []) as ParliamentRow[];
    allRows.push(...rows);

    if (rows.length < pageSize) {
      break;
    }
  }

  return allRows;
}

function makeTopics(rows: ParliamentRow[]): Topic[] {
  const names = [
    ...new Set(rows.map((row) => text(row.topic)).filter(Boolean)),
  ];

  return names.map((name) => ({
    id: makeId(name),
    label: name,
    description: "",
  }));
}

function makeParties(rows: ParliamentRow[]): Party[] {
  const names = [
    ...new Set(rows.map((row) => text(row.party)).filter(Boolean)),
  ];

  return names.map((name) => ({
    id: makeId(name),
    shortName: name,
    fullName: name,
    accent: accentFor(name),
  }));
}

function makeStatements(rows: ParliamentRow[]): Statement[] {
  return rows.flatMap((row, index) => {
    const topic = text(row.topic);
    const party = text(row.party);

    if (!topic || !party) {
      return [];
    }

    return [
      {
        id: text(row.id) || `row-${index}`,
        topicId: makeId(topic),
        partyId: makeId(party),
        subcategory: text(row.subcategory),
        speaker: text(row.speaker) || "Δεν αναφέρεται",
        role: text(row.source_type) || "Δεν προσδιορίζεται",
        date: text(row.date) || "Δεν αναφέρεται",
        summary: text(row.summary) || "Δεν υπάρχει περίληψη.",
        quote: text(row.exact_quote),
        sourceUrl: text(row.source_url),
        placeholder: false,
      },
    ];
  });
}

async function loadMockDataset(): Promise<ParliamentDataset> {
  const mock = await import("@/data/mock");
  return {
    topics: mock.topics,
    parties: mock.parties,
    statements: mock.statements,
  };
}

async function loadParliamentDataset(): Promise<ParliamentDataset> {
  if (isUsingMockData()) {
    return loadMockDataset();
  }

  const rows = await fetchRows();
  return {
    topics: makeTopics(rows),
    parties: makeParties(rows),
    statements: makeStatements(rows),
  };
}

export function getParliamentDataset(): Promise<ParliamentDataset> {
  if (!datasetInflight) {
    datasetInflight = loadParliamentDataset().finally(() => {
      datasetInflight = null;
    });
  }

  return datasetInflight;
}

export async function getTopics(): Promise<Topic[]> {
  const dataset = await getParliamentDataset();
  return dataset.topics;
}

export async function getParties(): Promise<Party[]> {
  const dataset = await getParliamentDataset();
  return dataset.parties;
}

export async function getStatements(
  filters: StatementFilters = {},
): Promise<Statement[]> {
  const { statements } = await getParliamentDataset();

  return statements.filter((statement) => {
    if (filters.topicId && statement.topicId !== filters.topicId) {
      return false;
    }

    if (filters.partyIds && !filters.partyIds.includes(statement.partyId)) {
      return false;
    }

    return true;
  });
}

export async function getParty(id: PartyId): Promise<Party> {
  const parties = await getParties();
  const party = parties.find((item) => item.id === id);

  if (!party) {
    throw new Error(`Party not found: ${id}`);
  }

  return party;
}

export async function getTopic(id: TopicId): Promise<Topic> {
  const topics = await getTopics();
  const topic = topics.find((item) => item.id === id);

  if (!topic) {
    throw new Error(`Topic not found: ${id}`);
  }

  return topic;
}
