module.exports = {
  reactStrictMode: true,

  images: {
    domains: [
      'lastfm.freetls.fastly.net'
    ],
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) config.resolve.fallback.fs = false;
    return config
  },
  
}