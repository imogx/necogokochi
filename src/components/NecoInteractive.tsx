import { useState } from "react";
import {
  bodyParts,
  catTypes,
  moodConfig,
  type CatType,
  type BodyPart,
} from "../data/reactions";

interface Props {
  baseUrl: string;
}

export default function NecoInteractive({ baseUrl }: Props) {
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
    <div className="max-w-lg md:max-w-3xl mx-auto px-4 py-4 pb-10 space-y-4">

      {/* Top row: 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Cat type selector */}
        <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">
            猫のタイプを選ぶ
          </p>
          <div className="grid grid-cols-2 gap-3">
            {catTypes.map((ct) => {
              const selected = catType === ct.id;
              return (
                <button
                  key={ct.id}
                  onClick={() => setCatType(ct.id)}
                  aria-pressed={selected}
                  className={`rounded-2xl border-2 py-4 px-3 text-center transition-all duration-150 active:scale-95 flex flex-col items-center gap-2 ${
                    selected
                      ? "border-amber-400 bg-amber-50 shadow-md"
                      : "border-stone-100 bg-stone-50 hover:border-amber-200 hover:bg-amber-50/30"
                  }`}
                >
                  <img
                    src={`${baseUrl}${ct.image}`}
                    alt={ct.label}
                    className={`w-20 h-20 object-contain transition-transform duration-200 ${
                      selected ? "scale-110" : ""
                    }`}
                  />
                  <div className="text-center">
                    <p
                      className={`text-sm font-bold ${
                        selected ? "text-amber-700" : "text-gray-700"
                      }`}
                    >
                      {ct.label}
                      {selected && (
                        <span className="ml-1 text-amber-400 text-xs">✓</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                      {ct.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Body part buttons */}
        <section className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">
            触る部位を選ぶ
          </p>
          <div className="flex flex-wrap gap-2 justify-center content-start">
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
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
                    isSelected
                      ? `${m.border} ${m.bg} ${m.color} shadow-sm`
                      : "border-stone-200 bg-stone-50 text-gray-600 hover:border-stone-300 hover:bg-white"
                  }`}
                >
                  {part.name}
                </button>
              );
            })}
          </div>
        </section>

      </div>

      {/* Reaction display */}
      {reaction && mood && selectedPart ? (
        <section
          role="status"
          aria-live="polite"
          className={`rounded-3xl border-2 p-6 transition-all duration-200 ${mood.bg} ${mood.border}`}
        >
          <div className="flex items-start gap-4 mb-3">
            <span className="text-4xl shrink-0 leading-none mt-0.5" aria-hidden>
              {mood.icon}
            </span>
            <div className="min-w-0">
              <p className={`font-bold text-lg leading-snug ${mood.color}`}>
                {reaction.label}
              </p>
              {isOverridden && currentCatType && (
                <span
                  className={`inline-block text-xs mt-1.5 px-2.5 py-0.5 rounded-full bg-white/60 font-medium ${mood.color}`}
                >
                  {currentCatType.label}な猫の場合
                </span>
              )}
            </div>
          </div>
          <p className={`text-sm leading-relaxed ${mood.color} opacity-90`}>
            {reaction.description}
          </p>
        </section>
      ) : (
        <section
          aria-hidden
          className="rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-8 text-center"
        >
          <p className="text-4xl mb-2">🐾</p>
          <p className="text-sm text-gray-400">部位を選ぶと猫の反応が表示されます</p>
        </section>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-300 text-center leading-relaxed px-2">
        ※ 個体差があるため、すべての猫に当てはまるものではありません
      </p>
    </div>
  );
}
