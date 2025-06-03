import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config: ClientConfig = {
  projectId: 'l173g37c',
  dataset: 'production',
  apiVersion: '2024-07-02',
  useCdn: false,
  token:
    'skzjWWViQEhN6ofspHLqwXIckHktW1hfMx8BgzyFNI78eR7eMWOEguLusv1eonJqw09iOzHQIa2xNIXq9EhAXiCLSLfbn5tgSYD5ROdkQD9m7xnEjIq6TlKehM1063mRZ7IKM1QiDC1wi0BCG8vpuYF8ZiGPJBIXYfGOGh0CBgrhY8FkPO0S',
};

const client = createClient(config);

// Set up the image url builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export default client;
