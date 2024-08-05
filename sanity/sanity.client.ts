import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "l173g37c",
  dataset: "production",
  apiVersion: "2024-07-02",
  useCdn: false,
};

const client = createClient(config);

export default client;
