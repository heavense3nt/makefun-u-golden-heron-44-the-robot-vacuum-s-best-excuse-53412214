import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

// The Robot Vacuum's Best Excuse — one line, 1-140 characters.
// The vacuum speaks for itself: the missed spot is not dirt it skipped,
// it is a protected wetland on its own map, and its cliff sensor will not
// cross international waters. The joke is rooted in the vacuum's own world
// (map, cliff sensor) and lands with a clean turn at the end.
const TEXT =
  "I didn't miss that spot. My map says it's a protected wetland now, and my cliff sensor refuses to cross international waters.";

function main(): void {
  if (!TEXT || TEXT.trim().length === 0) {
    throw new Error("entry text is empty or only whitespace");
  }
  if (TEXT.length < 1 || TEXT.length > 140) {
    throw new Error(`entry text must be 1-140 characters, got ${TEXT.length}`);
  }
  if (TEXT !== TEXT.trim()) {
    throw new Error("entry text must not start or end with whitespace");
  }
  if (TEXT.includes("\n") || TEXT.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  const dest = isAbsolute(outDir)
    ? join(outDir, "entry.txt")
    : join(process.cwd(), outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(dest, TEXT, "utf8");
  const back = readFileSync(dest, "utf8");
  if (back !== TEXT) {
    throw new Error("read-back mismatch: entry.txt does not match the entry text");
  }
  console.log(`wrote ${dest} (${TEXT.length} characters, verified)`);
}

main();
