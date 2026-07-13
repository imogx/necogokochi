import { useState } from "react";
import {
  bodyParts,
  catTypes,
  moodConfig,
  type CatType,
  type BodyPart,
} from "../data/reactions";

export default function NecoInteractive() {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [catType, setCatType] = useState<CatType>("unknown");

  const getReaction = (part: BodyPart) => {
    const override = part.reaction.overrides?.[catType];
    return override
      ? { ...part.reaction, ...override }
      : part.reaction;
  };

  const reaction = selectedPart ? getReaction(selectedPart) : null;
  const mood = reaction ? moodConfig[reaction.mood] : null;

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
      {/* Cat type selector */}
      <section>
        <p className="text-sm text-gray-500 mb-3 text-center">
          触れ合う猫のタイプを選んでください
        </p>
        <div className="grid grid-cols-2 gap-2">
          {catTypes.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setCatType(ct.id)}
              className={`rounded-xl border-2 px-3 py-2 text-left transition-all ${
                catType === ct.id
                  ? "border-amber-400 bg-amber-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-sm font-semibold text-gray-800 block">
                {ct.label}
              </span>
              <span className="text-xs text-gray-500">{ct.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Cat illustration */}
      <section className="text-center">
        <img
          src={`${import.meta.env.BASE_URL}neco.png`}
          alt="猫のイラスト"
          className="mx-auto max-h-64 object-contain"
          width={400}
          height={400}
        />
      </section>

      {/* Body part buttons */}
      <section>
        <p className="text-sm text-gray-500 mb-3 text-center">
          触る部位を選んでください
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {bodyParts.map((part) => {
            const r = getReaction(part);
            const m = moodConfig[r.mood];
            return (
              <button
                key={part.id}
                onClick={() =>
                  setSelectedPart((prev) =>
                    prev?.id === part.id ? null : part
                  )
                }
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                  selectedPart?.id === part.id
                    ? `${m.border} ${m.bg} ${m.color}`
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {part.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Reaction display */}
      {reaction && mood && selectedPart && (
        <section
          className={`rounded-2xl border-2 p-5 space-y-2 transition-all ${mood.bg} ${mood.border}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{mood.icon}</span>
            <span className={`font-bold text-base ${mood.color}`}>
              {reaction.label}
            </span>
          </div>
          <p className={`text-sm leading-relaxed ${mood.color}`}>
            {reaction.description}
          </p>
        </section>
      )}

      {!selectedPart && (
        <section className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5 text-center text-sm text-gray-400">
          部位を選ぶと、猫の反応が表示されます
        </section>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        ※ これは一般的な傾向であり、すべての猫に当てはまるものではありません。
        個体差があることをご了承ください。
      </p>
    </div>
  );
}
