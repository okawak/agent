import type { Metadata } from "next";
import Link from "next/link";
import {
  type PlaygroundItemStatus,
  playgroundSections,
  playgroundStatusMeta,
} from "./data";

export const metadata: Metadata = {
  title: "Mastra Playground | agent",
  description:
    "Mastra と Amazon Bedrock の機能検証ページへのハブ。サーバー専用ツール運用と UI 体験を整理したトップページ。",
};

const statusOrder: PlaygroundItemStatus[] = [
  "available",
  "in-progress",
  "planned",
];

const policyLinks = [
  {
    label: "開発ポリシー (AGENTS.md)",
    href: "https://github.com/okawak/agent/blob/main/AGENTS.md",
  },
  {
    label: "Playground 要件定義",
    href: "https://github.com/okawak/agent/blob/main/docs/playground/top-page.md",
  },
  {
    label: "セキュリティ原則まとめ",
    href: "https://github.com/okawak/agent/blob/main/AGENTS.md#5-%E5%8E%9F%E5%89%87%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3--%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E5%A2%83%E7%95%8C--%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC",
  },
];

function StatusLegend() {
  return (
    <dl className="flex flex-wrap gap-3">
      {statusOrder.map((status) => {
        const meta = playgroundStatusMeta[status];
        return (
          <div
            key={status}
            className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-slate-200 ring-1 ring-inset ring-white/10"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${meta.dotClassName}`}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-medium">{meta.label}</span>
              <span className="text-xs text-slate-400">{meta.description}</span>
            </div>
          </div>
        );
      })}
    </dl>
  );
}

export default function PlaygroundPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28)_0,_rgba(15,23,42,0.95)_55%)]" />
      <div className="absolute inset-y-0 left-1/2 -z-10 hidden w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl lg:block" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <header className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
            Mastra Playground Hub
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Bedrock × Mastra を安全に試すための案内板
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                Playground では、サーバー専用に実装した Mastra ツールと Amazon
                Bedrock
                をローカルで検証します。各ページは随時追加されるため、現状の提供状況と次の開発候補をこのトップページで確認できます。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/okawak/agent/blob/main/docs/playground/top-page.md"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  要件定義を確認する
                  <span
                    aria-hidden="true"
                    className="translate-y-[1px] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="https://github.com/okawak/agent/blob/main/AGENTS.md#6-アーキテクチャ指針"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-slate-50 transition hover:border-cyan-400/60 hover:text-cyan-100"
                  target="_blank"
                  rel="noreferrer"
                >
                  アーキテクチャ方針
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur-lg">
              <h2 className="text-base font-semibold text-slate-100">
                実装フロー概要
              </h2>
              <p className="mt-2 leading-relaxed text-slate-300">
                すべての Playground は server-only でツールを実行し、UI は API
                を経由して結果を表示します。Bedrock
                資格情報はクライアントに露出せず、環境変数と zod
                バリデーションで注入します。
              </p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>ユニットテストと Biome を CI ゲートとして必須化</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>Zero-Exposure 原則を遵守し server-only 境界を維持</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>UI 体験は shadcn/ui や MUI を活用してモダンに整備</span>
                </li>
              </ul>
            </div>
          </div>
          <StatusLegend />
        </header>

        <div className="space-y-14">
          {playgroundSections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`${section.id}-title`}
              className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <h2
                    id={`${section.id}-title`}
                    className="text-2xl font-semibold text-slate-50"
                  >
                    {section.title}
                  </h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
                    {section.description}
                  </p>
                </div>
                <div className="text-xs font-medium uppercase tracking-widest text-slate-400">
                  {section.items.length} entries
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => {
                  const meta = playgroundStatusMeta[item.status];
                  const CardTag =
                    item.status === "available" && item.href ? Link : "div";
                  const cardProps =
                    item.status === "available" && item.href
                      ? {
                          href: item.href,
                          className:
                            "group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-cyan-500/10 transition hover:border-cyan-400/60 hover:bg-slate-900/80",
                        }
                      : {
                          className:
                            "flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/40 p-6 opacity-90",
                          "aria-disabled": true,
                        };

                  return (
                    <CardTag key={item.id} {...cardProps}>
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 rounded-full ${meta.dotClassName}`}
                          />
                          {meta.label}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-slate-50">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                        <span>
                          {item.status === "available"
                            ? "アクセス可能"
                            : item.status === "in-progress"
                              ? "実装中"
                              : "近日追加"}
                        </span>
                        {item.status === "available" && item.href ? (
                          <span
                            aria-hidden="true"
                            className="transition group-hover:translate-x-1"
                          >
                            →
                          </span>
                        ) : null}
                      </div>
                    </CardTag>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-100">
            運用ドキュメント & チェックリスト
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            開発フローやガードレールの詳細は docs/ と AGENTS.md
            に整理されています。各 Playground
            を実装する際は以下の資料を参照し、PR
            説明にリンクを添付してください。
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
