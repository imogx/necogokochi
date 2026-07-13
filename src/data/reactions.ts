export type CatType = "friendly" | "shy" | "independent" | "unknown";
export type Mood = "love" | "neutral" | "warning" | "danger";

export interface Reaction {
  mood: Mood;
  label: string;
  description: string;
  // override per cat type (partial)
  overrides?: Partial<Record<CatType, Pick<Reaction, "label" | "description">>>;
}

export interface BodyPart {
  id: string;
  name: string;
  emoji: string;
  reaction: Reaction;
}

export const bodyParts: BodyPart[] = [
  {
    id: "head",
    name: "頭・耳の後ろ",
    emoji: "🐱",
    reaction: {
      mood: "love",
      label: "気持ちよさそうに目を細める",
      description:
        "多くの猫が好む部位です。ゆっくり撫でるとゴロゴロと喉を鳴らすことがあります。",
      overrides: {
        shy: {
          label: "最初は様子を見るが、慣れると目を細める",
          description:
            "人見知りな猫には、まず猫の方から近づくのを待ちましょう。信頼関係ができると喜んでくれます。",
        },
      },
    },
  },
  {
    id: "chin",
    name: "顎の下",
    emoji: "😌",
    reaction: {
      mood: "love",
      label: "リラックスして顎を上げる",
      description:
        "自分では毛づくろいしにくい場所のため、喜ぶ猫が多いです。そっと指先で撫でてみてください。",
      overrides: {
        shy: {
          label: "少し警戒するが、慣れると顎を上げてくる",
          description:
            "人見知りな猫でも顎下は比較的安全な部位です。急に触らず、ゆっくりアプローチしましょう。",
        },
      },
    },
  },
  {
    id: "back",
    name: "背中",
    emoji: "✋",
    reaction: {
      mood: "neutral",
      label: "背中を軽く反らせる",
      description:
        "好きな猫が多い一方、しつこく触ると嫌がることもあります。猫の反応を見ながら加減しましょう。",
      overrides: {
        shy: {
          label: "逃げることもある。様子見が大切",
          description:
            "人見知りな猫は背中でも警戒することがあります。無理に触らず、猫が落ち着いてからにしましょう。",
        },
        independent: {
          label: "機嫌によって反応が大きく変わる",
          description:
            "マイペースな猫は自分の気分優先。撫でてほしいときは自分から寄ってきます。",
        },
      },
    },
  },
  {
    id: "belly",
    name: "お腹",
    emoji: "⚠️",
    reaction: {
      mood: "warning",
      label: "警戒して体を丸める・猫パンチの構え",
      description:
        "お腹は急所のため、信頼関係ができていないと嫌がる猫がほとんどです。仰向けになっていても、触ってほしいサインとは限りません。",
      overrides: {
        friendly: {
          label: "慣れた猫なら許してくれることもあるが注意",
          description:
            "人懐っこい猫でも、お腹は慎重に。まず前足付近から様子を見てみましょう。",
        },
        shy: {
          label: "絶対にNG。猫パンチ・噛みつきに注意",
          description:
            "人見知りな猫のお腹は絶対に触らないようにしましょう。強いストレスを与えてしまいます。",
        },
      },
    },
  },
  {
    id: "tail-base",
    name: "しっぽの付け根",
    emoji: "🐈",
    reaction: {
      mood: "neutral",
      label: "腰を持ち上げる・しっぽを立てる",
      description:
        "敏感な猫が多い部位です。反応には個体差が大きく、喜ぶ子もいれば嫌がる子もいます。",
      overrides: {
        shy: {
          label: "嫌がる可能性が高い。避けた方が無難",
          description:
            "人見知りな猫には刺激が強い場合があります。他の部位で信頼を築いてからにしましょう。",
        },
      },
    },
  },
  {
    id: "tail-tip",
    name: "しっぽの先",
    emoji: "😤",
    reaction: {
      mood: "danger",
      label: "不快そうにしっぽを振る",
      description:
        "多くの猫が嫌がる部位です。触られると急に逃げたり、噛みつくことがあります。基本的に避けましょう。",
    },
  },
  {
    id: "paw",
    name: "肉球",
    emoji: "🐾",
    reaction: {
      mood: "warning",
      label: "驚いて足を引っ込める",
      description:
        "敏感なセンサーが集まる場所で、苦手な猫が多いです。無理に触らず、猫が自分から乗せてくるのを待ちましょう。",
    },
  },
];

export const catTypes: { id: CatType; label: string; description: string }[] =
  [
    {
      id: "friendly",
      label: "人懐っこい",
      description: "初対面でもすり寄ってくるタイプ",
    },
    {
      id: "shy",
      label: "人見知り",
      description: "隠れたり、距離を取るタイプ",
    },
    {
      id: "independent",
      label: "マイペース",
      description: "気分次第で接し方が変わるタイプ",
    },
    {
      id: "unknown",
      label: "わからない",
      description: "まだよく知らない猫",
    },
  ];

export const moodConfig: Record<
  Mood,
  { color: string; bg: string; border: string; icon: string }
> = {
  love: {
    color: "text-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    icon: "💕",
  },
  neutral: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "🤔",
  },
  warning: {
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "⚠️",
  },
  danger: {
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "🚫",
  },
};
