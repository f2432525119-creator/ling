import type { StoryChoice } from "@/types/narrative";

type ChoiceActionsProps = {
  choices: StoryChoice[];
  disabled?: boolean;
  onChoose: (choice: StoryChoice) => Promise<void>;
};

export function ChoiceActions({ choices, disabled = false, onChoose }: ChoiceActionsProps) {
  if (choices.length === 0) return null;

  return (
    <div className="border-t border-black/10 p-3">
      <p className="mb-2 text-xs uppercase tracking-[0.15em] text-black/50">剧情选项</p>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => void onChoose(choice)}
            disabled={disabled}
            className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs text-black/75 transition hover:border-black/30 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
