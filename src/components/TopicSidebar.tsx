import type { Topic, TopicId } from "@/types/parliament";
import { usePrefs } from "@/lib/prefs";

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
  const { t } = usePrefs();
  return (
    <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
      <nav aria-label={t.topicsNav} className="flex flex-col gap-2.5">
        {topics.map((topic) => {
          const active = topic.id === activeTopicId;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelect(topic.id)}
              aria-current={active ? "true" : undefined}
              className={`w-full min-w-0 rounded-xl border px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                active
                  ? "border-active bg-active text-active-fg"
                  : "border-line bg-panel text-foreground hover:border-muted"
              }`}
            >
              <span className="block break-words text-base font-semibold leading-snug">
                {topic.label}
              </span>

              {topic.description && (
                <span
                  className={`mt-1 block break-words text-xs leading-snug ${
                    active ? "text-active-sub" : "text-muted"
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
