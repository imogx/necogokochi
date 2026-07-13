import { useState } from "react";
import {
  bodyParts,
  catTypes,
  moodConfig,
  type CatType,
  type BodyPart,
} from "../data/reactions";

const catTypeEmoji: Record<CatType, string> = {
  friendly: "😸",
  shy: "🙈",
  independent: "😼",
  unknown: "🐱",
};

interface Props {
  necoImageUrl: string;
}

export default function NecoInteractive({ necoImageUrl }: Props) {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [catType, setCatType] = useState<CatType>("unknown");

  const getReaction = (part: BodyPart) => {
    const override = part.reaction.overrides?.[catType];
    return override ? { ...part.reaction, ...override } : part.reaction;
  };

  const reaction = selectedPart ? getReaction(selectedPart) : null;
  const mood = reaction ? moodConfig[reaction.mood] : null;
  const isOverridden =
    selectedPart && catType !== "unknown"
      ? Boolean(selectedPart.reaction.overrides?.[catType])
      : false;
  const currentCatType = catTypes.find((ct) => ct.id === catType);

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Cat type selector */}
      <section aria-labelledby="cat-type-label">
        <p id="cat-type-label" className="text-sm text-gray-500 mb-3 text-center">
          触れ合う猫のタイプを選んでください
        </p>
        <div className="grid grid-cols-2 gap-2">
          {catTypes.map((ct) => {
            const selected = catType === ct.id;
            return (
              <button
                key={ct.id}
                onClick={() => setCatType(ct.id)}
                aria-pressed={selected}
                className={`rounded-xl border-2 px-3 py-3 text-left transition-all active:scale-95 ${
                  selected
                    ? "border-amber-400 bg-amber-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-amber-200"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-lg">{catTypeEmoji[ct.id]}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {ct.label}
                  </span>
                  {selected && (
                    <span className="ml-auto text-amber-500 text-xs">✓</span>
                  )}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 block pl-7">
                  {ct.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cat illustration */}
      <section className="text-center">
        <img
          src={necoImageUrl}
          alt="猫のイラスト"
          className="mx-auto max-h-60 object-contain drop-shadow-sm"
          width={400}
          height={400}
        />
        <p className="text-xs text-gray-400 mt-2">↓ 触る部位を選んでね</p>
      </section>

      {/* Body part buttons */}
      <section aria-labelledby="body-part-label">
        <p id="body-part-label" className="sr-only">
          触る部位を選んでください
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {bodyParts.map((part) => {
            const r = getReaction(part);
            const m = moodConfig[r.mood];
            const isSelected = selectedPart?.id === part.id;
            return (
              <button
                key={part.id}
                onClick={() =>
                  setSelectedPart((prev) => (prev?.id === part.id ? null : part))
                }
                aria-pressed={isSelected}
                className={`rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                  isSelected
                    ? `${m.border} ${m.bg} ${m.color} shadow-sm`
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-1">{part.emoji}</span>
                {part.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Reaction display */}
      {reaction && mood && selectedPart ? (
        <section
          role="status"
          aria-live="polite"
          className={`rounded-2xl border-2 p-5 space-y-3 ${mood.bg} ${mood.border}`}
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl mt-0.5" aria-hidden>
              {mood.icon}
            </span>
            <div>
              <p className={`font-bold text-base leading-snug ${mood.color}`}>
                {reaction.label}
              </p>
              {isOverridden && currentCatType && (
                <p className={`text-xs mt-0.5 opacity-70 ${mood.color}`}>
                  {catTypeEmoji[catType]} {currentCatType.label}な猫の場合
                </p>
              )}
            </div>
          </div>
          <p className={`text-sm leading-relaxed ${mood.color}`}>
            {reaction.description}
          </p>
        </section>
      ) : (
        <section
          aria-hidden
          className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center"
        >
          <p className="text-3xl mb-1">🐾</p>
          <p className="text-sm text-gray-400">部位を選ぶと猫の反応が表示されます</p>
        </section>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed pb-2">
        ※ これは一般的な傾向であり、すべての猫に当てはまるものではありません。
        個体差があることをご了承ください。
      </p>
    </div>
  );
}
