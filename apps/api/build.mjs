import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/server.ts"],
  outfile: "./dist/server.js",
  bundle: true,
  platform: "node",
  target: "es2023",
  sourcemap: true,
  minify: false,
});
