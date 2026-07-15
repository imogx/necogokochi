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
  reaction: Reaction;
}

export const bodyParts: BodyPart[] = [
  {
    id: "head",
    name: "頭・耳の後ろ",
    reaction: {
      mood: "love",
      label: "気持ちよさそうに目を細める",
      description:
        "多くの猫が好む部位です。ゆっくり撫でるとゴロゴロと喉を鳴らすことがあります。",
      overrides: {
        friendly: {
          label: "ゴロゴロが止まらない・もっとやってとアピール",
          description:
            "人懐っこい猫は頭を撫でられるのが大好きです。手を止めると頭を押しつけてきてもっとやってとせがむことがあります。",
        },
        shy: {
          label: "最初は様子を見るが、慣れると目を細める",
          description:
            "人見知りな猫には、まず猫の方から近づくのを待ちましょう。信頼関係ができると喜んでくれます。",
        },
        independent: {
          label: "機嫌がいいときはゴロゴロ、悪いと逃げる",
          description:
            "マイペースな猫は気分によって反応が全然違います。しっぽの動きや耳の向きで気分を確認しながら撫でましょう。",
        },
      },
    },
  },
  {
    id: "chin",
    name: "顎の下",
    reaction: {
      mood: "love",
      label: "リラックスして顎を上げる",
      description:
        "自分では毛づくろいしにくい場所のため、喜ぶ猫が多いです。そっと指先で撫でてみてください。",
      overrides: {
        friendly: {
          label: "うっとりして固まる・催眠状態になる子も",
          description:
            "人懐っこい猫は顎下が特に大好きな子が多いです。撫でていると動かなくなってそのまま眠ってしまうこともあります。",
        },
        shy: {
          label: "少し警戒するが、慣れると顎を上げてくる",
          description:
            "人見知りな猫でも顎下は比較的安全な部位です。急に触らず、ゆっくりアプローチしましょう。",
        },
        independent: {
          label: "乗り気のときはうっとり。気分次第",
          description:
            "マイペースな猫は自分から顎を差し出してきたらチャンスです。こちらから積極的に触りにいくと拒否されることがあります。",
        },
      },
    },
  },
  {
    id: "cheek",
    name: "頬・こめかみ",
    reaction: {
      mood: "love",
      label: "目を細めてすり寄ってくる",
      description:
        "頬には臭腺があり、猫が自分からこすりつける場所です。撫でられると「自分のにおいをつけてもらっている」感覚で喜ぶ子が多いです。",
      overrides: {
        friendly: {
          label: "ぐいぐい自分からこすりつけてくる",
          description:
            "人懐っこい猫は頬を撫でると自分からぐりぐり押しつけてきます。「もっとやって」のサインです。存分に撫でてあげましょう。",
        },
        shy: {
          label: "慣れた相手なら顔を近づけてくる",
          description:
            "人見知りな猫でも、信頼した相手には頬をこすりつけることがあります。猫の方から来るのを待ちましょう。",
        },
        independent: {
          label: "気分がいいと自分から顔を寄せてくる",
          description:
            "マイペースな猫は気分が乗っているときだけ許してくれます。猫が顔を近づけてきたタイミングを逃さず撫でましょう。",
        },
      },
    },
  },
  {
    id: "neck",
    name: "首まわり",
    reaction: {
      mood: "love",
      label: "首を伸ばしてうっとりする",
      description:
        "自分では毛づくろいしにくい場所のため、喜ぶ猫が多いです。指先で優しく揉むように撫でると気持ちよさそうにします。",
      overrides: {
        shy: {
          label: "最初は固まるが、慣れると首を伸ばす",
          description:
            "人見知りな猫には急に触らず、顎の下から少しずつ移動するようにアプローチすると受け入れてもらいやすいです。",
        },
        independent: {
          label: "気分が乗っているときだけ許してくれる",
          description:
            "マイペースな猫は自分から来たときが触りどきです。しつこくすると離れていきます。",
        },
      },
    },
  },
  {
    id: "foreleg",
    name: "前足（腕）",
    reaction: {
      mood: "warning",
      label: "足を引っ込めて警戒する",
      description:
        "脚は急に動かされると感じる場所のため、触られるのを嫌がる猫が多いです。触る場合は猫がリラックスしているときに、そっと添えるように。",
      overrides: {
        friendly: {
          label: "許容する子もいるが個体差が大きい",
          description:
            "人懐っこい猫でも前足は苦手なことがあります。猫の様子を見ながらゆっくり試してみましょう。",
        },
        shy: {
          label: "ほぼNG。逃げるか猫パンチに注意",
          description:
            "人見知りな猫の前足には触れないようにしましょう。強いストレスになります。",
        },
      },
    },
  },
  {
    id: "ear-inside",
    name: "耳の中",
    reaction: {
      mood: "danger",
      label: "頭を振って嫌がる・逃げる",
      description:
        "耳の中は非常に敏感でデリケートな場所です。ほとんどの猫が嫌がります。耳の付け根や後ろを撫でるのとは全く異なるので避けましょう。",
    },
  },
  {
    id: "back",
    name: "背中",
    reaction: {
      mood: "neutral",
      label: "背中を軽く反らせる",
      description:
        "好きな猫が多い一方、しつこく触ると嫌がることもあります。猫の反応を見ながら加減しましょう。",
      overrides: {
        friendly: {
          label: "背中を反らして催促してくる",
          description:
            "人懐っこい猫は背中を撫でると気持ちよさそうに反らせて、もっとやってとアピールします。しっぽの付け根まで撫でるとさらに喜ぶ子も。",
        },
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
        independent: {
          label: "気分次第で急に豹変することがある",
          description:
            "マイペースな猫はお腹を触らせていたと思ったら急に噛みつく「ネコパンチ」をしてくることがあります。後ろ足でのキックにも注意。",
        },
      },
    },
  },
  {
    id: "tail-base",
    name: "しっぽの付け根",
    reaction: {
      mood: "neutral",
      label: "腰を持ち上げる・しっぽを立てる",
      description:
        "敏感な猫が多い部位です。反応には個体差が大きく、喜ぶ子もいれば嫌がる子もいます。",
      overrides: {
        friendly: {
          label: "腰を高く上げてもっとやってとアピール",
          description:
            "人懐っこい猫はしっぽの付け根が特に好きな子が多いです。腰をぐっと上げて催促してきたらたくさん撫でてあげましょう。",
        },
        shy: {
          label: "嫌がる可能性が高い。避けた方が無難",
          description:
            "人見知りな猫には刺激が強い場合があります。他の部位で信頼を築いてからにしましょう。",
        },
        independent: {
          label: "喜ぶこともあるが急に嫌になることも",
          description:
            "マイペースな猫はしっぽの付け根の反応が読みにくいです。しっぽをぴんと立てていれば喜んでいるサイン、振り始めたらやめどきです。",
        },
      },
    },
  },
  {
    id: "tail-tip",
    name: "しっぽの先",
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
    reaction: {
      mood: "warning",
      label: "驚いて足を引っ込める",
      description:
        "敏感なセンサーが集まる場所で、苦手な猫が多いです。無理に触らず、猫が自分から乗せてくるのを待ちましょう。",
      overrides: {
        friendly: {
          label: "我慢してくれることも。引っ込めたらやめどき",
          description:
            "人懐っこい猫でも肉球は苦手な子が多いです。触らせてくれても「嫌だけど我慢してる」状態のことがあります。足を引っ込めたらすぐやめましょう。",
        },
        shy: {
          label: "特に嫌がる。絶対に無理しないで",
          description:
            "人見知りな猫の肉球には触れないようにしましょう。肉球を触られることは強いストレスになります。",
        },
        independent: {
          label: "気分次第。引っ込めたらすぐやめること",
          description:
            "マイペースな猫は許してくれるときとそうでないときが極端です。少し触れてみて嫌がったらすぐ手を引きましょう。",
        },
      },
    },
  },
];

export const catTypes: {
  id: CatType;
  label: string;
  description: string;
  image: string;
}[] = [
  {
    id: "friendly",
    label: "人懐っこい",
    description: "初対面でもすり寄ってくるタイプ",
    image: "cats/cat-friendly.png",
  },
  {
    id: "shy",
    label: "人見知り",
    description: "隠れたり、距離を取るタイプ",
    image: "cats/cat-shy.png",
  },
  {
    id: "independent",
    label: "マイペース",
    description: "気分次第で接し方が変わるタイプ",
    image: "cats/cat-independent.png",
  },
  {
    id: "unknown",
    label: "わからない",
    description: "まだよく知らない猫",
    image: "cats/cat-unknown.png",
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
