import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/server.ts"],
  outdir: "dist",
  platform: "node",
  format: "esm",
  target: "es2023",
  bundle: true,
  packages: "external",
});
