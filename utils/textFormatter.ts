/**
 * Utility to format rich text / HTML content:
 * 1. Converts markdown links [label](url) -> <a href="url" target="_blank" rel="noopener noreferrer">label</a>
 * 2. Converts markdown bold **text** or __text__ -> <strong>text</strong>
 * 3. Converts markdown italic *text* -> <em>text</em>
 * 4. Auto-detects standalone URLs (https://..., http://..., www...., doi.org/...) that are not inside an <a> tag and wraps them in <a target="_blank" rel="noopener noreferrer">
 * 5. Ensures all <a> tags have target="_blank" and rel="noopener noreferrer"
 */
export function formatRichText(raw: string): string {
  if (!raw) return "";

  let result = raw;

  // 1. Convert markdown link syntax [label](url) to HTML <a>
  result = result.replace(
    /\[([^\]]+)\]\(((?:https?:\/\/|www\.)[^\s)]+)\)/g,
    (match, label, url) => {
      const href = url.startsWith("www.") ? `https://${url}` : url;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
  );

  // 2. Convert markdown bold **text** or __text__ to <strong>text</strong>
  result = result.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

  // 3. Convert markdown italic *text* to <em>text</em>
  result = result.replace(/(^|[^\w*])\*([^*\n]+)\*([^\w*]|$)/g, "$1<em>$2</em>$3");

  // 4. Auto-detect unlinked URLs that are NOT inside an existing HTML tag (e.g., href="...", <a...>...</a>)
  const parts = result.split(/(<[^>]+>)/g);
  let inAnchor = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<")) {
      if (/^<a\b/i.test(part)) {
        inAnchor = true;
      } else if (/^<\/a>/i.test(part)) {
        inAnchor = false;
      }
    } else if (!inAnchor) {
      // Find URLs: http://..., https://..., or www...., or doi.org/...
      parts[i] = part.replace(/((?:https?:\/\/|www\.|doi\.org\/)[^\s<"'>]+)/g, (url) => {
        const cleanUrl = url.replace(/[.,;!?)]+$/, "");
        const trailing = url.slice(cleanUrl.length);
        let href = cleanUrl;
        if (!/^https?:\/\//i.test(href)) {
          href = `https://${href}`;
        }
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${trailing}`;
      });
    }
  }

  result = parts.join("");

  return result;
}
