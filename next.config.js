const { apiLocation } = require('./config.json');

module.exports = {
    redirects: async () => [
        {
            source: '/login',
            destination: `${apiLocation}/auth/google`,
            permanent: true
        }
    ]
};
