export default {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://127.0.0.1:27017/shared-trip',
    // shortcut: dev fallback secret, set JWT_SECRET before deploying anywhere real
    jwtSecret: process.env.JWT_SECRET || 'shared-trip-dev-secret',
    cookieName: 'token',
};
