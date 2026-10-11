
import type { Topic, TopicId } from "@/types/parliament";

type TopicSidebarProps = {
  topics: Topic[];
  activeTopicId: TopicId;
  onSelect: (topicId: TopicId) => void;
};

export function TopicSidebar({
  topics,
  activeTopicId,
  onSelect,
}: TopicSidebarProps) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
          Θέματα
        </p>

        <span className="rounded-full bg-stone-200 px-2 py-1 text-xs text-stone-600">
          {topics.length}
        </span>
      </div>

      <nav
        aria-label="Θέματα συζήτησης"
        className="flex max-h-[420px] flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2"
      >
        {topics.map((topic) => {
          const active = topic.id === activeTopicId;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelect(topic.id)}
              aria-current={active ? "true" : undefined}
              className={`w-full min-w-0 rounded-xl border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-[#1b2a4a] bg-[#1b2a4a] text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <span className="block break-words text-sm font-semibold leading-snug">
                {topic.label}
              </span>

              {topic.description && (
                <span
                  className={`mt-1 block break-words text-xs ${
                    active ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  {topic.description}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
