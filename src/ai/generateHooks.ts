function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function extractKeywords(input: string): string[] {
  const s = input
    .toLowerCase()
    .replace(/https?:\/\//g, " ")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .trim();
  const parts = s.split(/\s+/g).filter(Boolean);
  const stop = new Set([
    "www",
    "com",
    "cn",
    "net",
    "org",
    "the",
    "and",
    "for",
    "with",
    "from",
    "into",
    "how",
    "why",
    "what"
  ]);
  const keep = parts.filter((p) => p.length >= 2 && !stop.has(p));
  return uniq(keep).slice(0, 6);
}

export type HookResult = {
  hooks: [string, string, string];
  nextStep: string;
};

export function generateHooks(params: {
  title: string;
  site: string;
  url: string;
  userIntent?: string;
}): HookResult {
  const { title, site, url, userIntent } = params;
  const kw = extractKeywords(`${title} ${site} ${url} ${userIntent ?? ""}`);
  const topic = kw[0] ?? (title.trim() ? title.trim() : "这个教程");
  const win = kw[1] ?? "上手";
  const cool = kw[2] ?? "关键一步";

  const hooks: [string, string, string] = [
    `学完你就能用「${topic}」解决一个具体痛点`,
    `最酷的部分：把「${cool}」跑通就够了`,
    `10 分钟先做到：${win} + 一个可见结果`
  ];

  const nextStep =
    kw.length >= 2
      ? `先只做第 1 步：把「${kw[0]}」的最小 demo 跑起来（10–20 分钟）`
      : "先只做第 1 步：跑通最小 demo（10–20 分钟）";

  return { hooks, nextStep };
}

