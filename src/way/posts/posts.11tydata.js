const LIMIT = 200;

function describe(raw) {
  const paragraphs = (raw || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(>|#|<|-|\d+\.)/.test(p));

  const text = (paragraphs[0] || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\\(.)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= LIMIT) return text;

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > LIMIT) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  return text.slice(0, LIMIT).replace(/\s\S*$/, "") + "…";
}

module.exports = {
  eleventyComputed: {
    postDescription: (data) => describe(data.page && data.page.rawInput),
  },
};
