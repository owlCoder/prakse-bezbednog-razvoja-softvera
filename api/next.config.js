module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://https://oib-api3.vercel.app/:path*',
          },
        ]
      },
  };