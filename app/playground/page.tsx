import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
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

const statusMessages: Record<PlaygroundItemStatus, string> = {
  available: "アクセス可能",
  "in-progress": "実装中",
  planned: "近日追加",
};

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
    <dl className="grid gap-3 sm:grid-cols-3">
      {statusOrder.map((status) => {
        const meta = playgroundStatusMeta[status];
        return (
          <div
            key={status}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100"
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-2.5 w-2.5 flex-shrink-0 rounded-full",
                meta.dotClassName,
              )}
            />
            <div className="space-y-1 text-left">
              <p className="text-sm font-semibold leading-tight">
                {meta.label}
              </p>
              <p className="text-xs text-slate-400">{meta.description}</p>
            </div>
          </div>
        );
      })}
    </dl>
  );
}

function StatusBadge({ status }: { status: PlaygroundItemStatus }) {
  const meta = playgroundStatusMeta[status];
  return (
    <Badge className={cn(meta.badgeClassName, "gap-2 text-xs font-medium")}>
      <span
        aria-hidden="true"
        className={cn("h-2 w-2 rounded-full", meta.dotClassName)}
      />
      {meta.label}
    </Badge>
  );
}

export default function PlaygroundPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28)_0,_rgba(15,23,42,0.95)_55%)]" />
      <div className="absolute inset-y-0 left-1/2 -z-10 hidden w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl lg:block" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <header className="space-y-10">
          <Badge className="bg-cyan-500/15 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Mastra Playground Hub
          </Badge>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Bedrock × Mastra を安全に試すための案内板
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                  Playground では、サーバー専用に実装した Mastra ツールと Amazon
                  Bedrock
                  をローカルで検証します。各ページは随時追加されるため、現状の提供状況と次の開発候補をこのトップページで確認できます。
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link
                    href="https://github.com/okawak/agent/blob/main/docs/playground/top-page.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    要件定義を確認する
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link
                    href="https://github.com/okawak/agent/blob/main/AGENTS.md#6-アーキテクチャ指針"
                    target="_blank"
                    rel="noreferrer"
                  >
                    アーキテクチャ方針
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/15 bg-white/10">
              <CardHeader className="space-y-3">
                <Badge className="bg-white/15 text-xs font-medium text-emerald-200">
                  Implementation Notes
                </Badge>
                <CardTitle className="text-base text-slate-100">
                  実装フロー概要
                </CardTitle>
                <CardDescription>
                  すべての Playground は server-only でツールを実行し、UI は API
                  を経由して結果を表示します。Bedrock
                  資格情報はクライアントに露出せず、環境変数と zod
                  バリデーションで注入します。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">
                  - ユニットテストと Biome を CI ゲートとして必須化
                </p>
                <p className="text-sm text-slate-300">
                  - Zero-Exposure 原則を遵守し server-only 境界を維持
                </p>
                <p className="text-sm text-slate-300">
                  - UI 体験は shadcn/ui コンポーネントで再利用性を高める
                </p>
              </CardContent>
            </Card>
          </div>

          <StatusLegend />
        </header>

        <div className="space-y-14">
          {playgroundSections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`${section.id}-title`}
              className="space-y-8"
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
                {section.items.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "h-full border-white/10 bg-slate-900/60 transition",
                      item.status === "available"
                        ? "hover:border-emerald-400/60 hover:bg-slate-900/80"
                        : "opacity-90",
                    )}
                  >
                    <CardHeader className="space-y-4">
                      <StatusBadge status={item.status} />
                      <div className="space-y-2">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="text-xs text-slate-400">
                      <span>{statusMessages[item.status]}</span>
                      {item.status === "available" && item.href ? (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={item.href}>開く →</Link>
                        </Button>
                      ) : null}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-100">
              運用ドキュメント & チェックリスト
            </h2>
            <p className="text-sm text-slate-300">
              開発フローやガードレールの詳細は docs/ と AGENTS.md
              に整理されています。各 Playground
              を実装する際は以下の資料を参照し、PR
              説明にリンクを添付してください。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {policyLinks.map((link) => (
              <Card
                key={link.href}
                className="border-white/10 bg-white/5 p-0 transition hover:border-emerald-400/60"
              >
                <Button
                  asChild
                  variant="ghost"
                  className="h-full justify-between rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100"
                >
                  <Link href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span aria-hidden="true" className="pl-2">
                      →
                    </span>
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
