export type TopicId = string;
export type PartyId = string;

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
  /** English text for the language switch; Greek is shown when it is missing. */
  en?: { label: string; description: string };
};

export type Party = {
  id: PartyId;
  shortName: string;
  fullName: string;
  accent: string;
  en?: { shortName: string; fullName: string };
};

export type Statement = {
  id: string;
  topicId: TopicId;
  partyId: PartyId;
  subcategory?: string;
  speaker: string;
  role: string;
  date: string;
  summary: string;
  quote: string;
  sourceUrl: string;
  placeholder: boolean;
  en?: { speaker?: string; role?: string; summary?: string; quote?: string; subcategory?: string };
};

export type StatementFilters = {
  topicId?: TopicId;
  partyIds?: PartyId[];
};