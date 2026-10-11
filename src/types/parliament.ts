export type TopicId = string;
export type PartyId = string;

export type Topic = {
  id: TopicId;
  label: string;
  description: string;
};

export type Party = {
  id: PartyId;
  shortName: string;
  fullName: string;
  accent: string;
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
};

export type StatementFilters = {
  topicId?: TopicId;
  partyIds?: PartyId[];
};