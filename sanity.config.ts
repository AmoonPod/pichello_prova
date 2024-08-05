import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "pichelloconfig",
  title: "pichello_sanity",
  projectId: "l173g37c",
  dataset: "production",
  plugins: [structureTool()],
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
});
