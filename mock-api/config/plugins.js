module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'omA99XHLB5aY61whyhvu0g=='),
    },
  },
});
