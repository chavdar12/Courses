export default {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://127.0.0.1:27017/cubicle',
};
