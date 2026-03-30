export type UnfurlResult = {
  title?: string;
  site?: string;
  image?: string;
};

function pickMeta(html: string, property: string): string | undefined {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=[\\\"']${property}[\\\"'][^>]+content=[\\\"']([^\\\"']+)[\\\"'][^>]*>`,
    "i"
  );
  const m = html.match(re);
  return m?.[1]?.trim();
}

function pickTitle(html: string): string | undefined {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim();
}

export async function unfurl(url: string): Promise<UnfurlResult> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "SmartLearner/0.1 (local)" }
    });
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("text/html")) {
      return {};
    }
    const html = await res.text();
    const title = pickMeta(html, "og:title") ?? pickTitle(html);
    const image = pickMeta(html, "og:image");
    const site =
      pickMeta(html, "og:site_name") ??
      (() => {
        try {
          return new URL(url).hostname.replace(/^www\./, "");
        } catch {
          return undefined;
        }
      })();
    return { title, site, image };
  } catch {
    return {};
  }
}

