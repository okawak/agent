import { z } from "zod";

const playgroundItemStatusSchema = z.enum([
  "available",
  "in-progress",
  "planned",
]);

export type PlaygroundItemStatus = z.infer<typeof playgroundItemStatusSchema>;

const playgroundItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: playgroundItemStatusSchema,
  href: z.string().optional(),
  docsPath: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
});

const playgroundSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  items: z.array(playgroundItemSchema).min(1),
});

export type PlaygroundItem = z.infer<typeof playgroundItemSchema>;
export type PlaygroundSection = z.infer<typeof playgroundSectionSchema>;

const playgroundSectionsData: PlaygroundSection[] = playgroundSectionSchema
  .array()
  .parse([
    {
      id: "chat-agents",
      title: "チャット & エージェント",
      description:
        "Bedrock 上のモデルを使ったチャットおよびツール連携の検証ページ。段階的に機能を追加し、Mastra サーバーツールのみを経由して操作する想定です。",
      items: [
        {
          id: "bedrock-claude-chat",
          title: "Claude チャット（ベーシック）",
          description:
            "Bedrock Claude を使ったシンプルなメッセージングの動作検証。ツール未連携の基本チャネルを提供予定。",
          status: "in-progress",
        },
        {
          id: "tool-execution",
          title: "ツール呼び出し + チャット",
          description:
            "Mastra の server-only ツールを経由した関数呼び出しとチャット統合の検証。許可リストベースで外部 I/O を制御します。",
          status: "planned",
        },
        {
          id: "structured-output",
          title: "構造化出力テンプレート",
          description:
            "zod スキーマでガードした出力整形パターンの検証。UI では事前定義のプロンプトを選択できるようにします。",
          status: "planned",
        },
      ],
    },
    {
      id: "evaluation",
      title: "評価 & モニタリング",
      description:
        "ローカルでの軽量評価、実行ログ、再試行戦略の可視化のためのページ群。Mastra のメモリ／ロガー機能の活用を想定。",
      items: [
        {
          id: "execution-timeline",
          title: "実行タイムラインビュー",
          description:
            "リクエスト ID を軸にエージェント・ツール呼び出しをタイムライン表示する画面。構造化ログとの連携を検証します。",
          status: "planned",
        },
        {
          id: "cost-dashboard",
          title: "コスト & トークン推定",
          description:
            "推論リクエストの所要時間・リトライ回数・概算コストを可視化し、閾値超過で警告を行うダッシュボード。",
          status: "planned",
        },
      ],
    },
    {
      id: "operations",
      title: "運用ガードレール",
      description:
        "レート制限・入力サイズ制御・サーバー限定実行など、Zero-Exposure 原則を守るためのガード設定を確認するページ。",
      items: [
        {
          id: "rate-limits",
          title: "レート制限シミュレーター",
          description:
            "固定ウィンドウとスライディングウィンドウを切り替えて挙動を検証できる UI。ローカルストレージを使わずサーバー状態のみで制御予定。",
          status: "planned",
        },
        {
          id: "input-guard",
          title: "入力フィルタ & サニタイズ",
          description:
            "zod + カスタムフィルタでサイズ・構造・禁止語句を検証する仕組みを可視化。テストケースの即時実行も行えるようにします。",
          status: "planned",
        },
      ],
    },
  ]);

export const playgroundSections = playgroundSectionsData;

export const playgroundStatusMeta: Record<
  PlaygroundItemStatus,
  {
    label: string;
    description: string;
    badgeClassName: string;
    dotClassName: string;
  }
> = {
  available: {
    label: "利用可能",
    description: "実装済みでアクセス可能なセクション",
    badgeClassName:
      "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/30",
    dotClassName: "bg-emerald-400",
  },
  "in-progress": {
    label: "実装中",
    description: "現在実装を進めているエリア",
    badgeClassName:
      "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/30",
    dotClassName: "bg-amber-400",
  },
  planned: {
    label: "計画中",
    description: "次のスプリント以降に追加予定のエリア",
    badgeClassName:
      "bg-slate-500/10 text-slate-300 ring-1 ring-inset ring-slate-500/30",
    dotClassName: "bg-slate-400",
  },
};
