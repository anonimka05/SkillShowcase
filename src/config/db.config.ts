export const dbConfig = () => ({
  database: {
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    password: process.env.BD_PASSWORD,
    user: process.env.DB_USER,
  },
});
