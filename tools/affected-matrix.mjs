// Prints a GitHub Actions matrix of the affected courses and the toolchains each one needs.
// Usage: node tools/affected-matrix.mjs [--all | --projects=a,b]
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const nx = (...args) => execFileSync("npx", ["nx", ...args], { encoding: "utf8" });
const pick = process.argv.find((a) => a.startsWith("--projects="));
const names = pick ? pick.slice(11).split(",")
  : JSON.parse(nx("show", "projects", ...(process.argv.includes("--all") ? [] : ["--affected"]), "--json"));
const include = names.map((name) => {
  const { root } = JSON.parse(nx("show", "project", name, "--json"));
  const { tags = [], targets = {} } = JSON.parse(readFileSync(`${root}/project.json`, "utf8"));
  const stacks = tags.filter((t) => t.startsWith("stack:")).map((t) => t.slice(6));
  const formats = (targets.format?.options.command ?? "").split(" format ")[1]?.split(" ") ?? [];
  // the tools string decides which toolchains the job installs
  return { project: name, root, tools: ` ${[...stacks, ...formats].join(" ")} ` };
}).filter((p) => p.tools.trim());
console.log(JSON.stringify({ include }));
