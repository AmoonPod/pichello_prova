import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const baseConfig: ClientConfig = {
  projectId: 'l173g37c',
  dataset: 'production',
  apiVersion: '2024-07-02',
};

// Client with CDN enabled for read-only queries (faster, cached by Sanity CDN)
// Use this for public data queries that don't require authentication
const readClientConfig: ClientConfig = {
  ...baseConfig,
  useCdn: true, // Enable CDN for better caching and performance
};

// Client without CDN for write operations (requires token)
// Use this for mutations or when you need real-time data
const writeClientConfig: ClientConfig = {
  ...baseConfig,
  useCdn: false, // Disable CDN for write operations
  token:
    'skzjWWViQEhN6ofspHLqwXIckHktW1hfMx8BgzyFNI78eR7eMWOEguLusv1eonJqw09iOzHQIa2xNIXq9EhAXiCLSLfbn5tgSYD5ROdkQD9m7xnEjIq6TlKehM1063mRZ7IKM1QiDC1wi0BCG8vpuYF8ZiGPJBIXYfGOGh0CBgrhY8FkPO0S',
};

// Read-only client with CDN (for public queries)
export const readClient = createClient(readClientConfig);

// Write client without CDN (for mutations, kept for backward compatibility)
const client = createClient(writeClientConfig);

// Set up the image url builder (uses read client for CDN benefits)
const builder = imageUrlBuilder(readClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Export write client as default for backward compatibility
export default client;
