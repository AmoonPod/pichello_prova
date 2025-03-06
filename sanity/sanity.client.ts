import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: process.env.SANITY,
  dataset: "production",
  apiVersion: "2024-07-02",
  useCdn: false,
};

const client = createClient(config);

export default client;
