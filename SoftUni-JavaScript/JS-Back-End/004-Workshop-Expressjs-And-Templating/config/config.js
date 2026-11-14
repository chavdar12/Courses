export default {
    port: process.env.PORT || 3000,
    // tests point this at a temp copy
    dbFile: process.env.DB_FILE || new URL('./database.json', import.meta.url)
};
