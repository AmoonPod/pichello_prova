/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // Image optimization
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for catalog performance
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 20, 24, 32, 48, 64, 96, 128, 160, 256, 384],
    // Better quality for catalog images
  },

  // Performance optimizations
  compress: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/tisane-infusi-e-te-dellappennino-reggiano',
        destination: '/prodotti?categoria=tisane-e-infusi',
        permanent: true, // 301 redirect
      },
      {
        source: '/miele-di-carpineti-nellappennino-reggiano',
        destination: '/prodotti?categoria=prodotti-dellalveare',
        permanent: true, // 301 redirect
      },
    ];
  },
  // Headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Preconnect to external domains
          {
            key: 'Link',
            value:
              '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets for a year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Bundle analyzer and webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 5,
        },
      };
    }
    return config;
  },

  // Production optimizations
  // swcMinify is enabled by default in Next.js 15+
};

module.exports = nextConfig;
