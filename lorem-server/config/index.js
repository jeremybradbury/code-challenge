module.exports = {
  development: {
    dialect: "sqlite",
    storage: "../db/mock-data.sqlite",
    define: {
      freezeTableName: true,
    },
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    define: {
      freezeTableName: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    use_env_variable: "DATABASE_URL",
    define: {
      // TODO: fix table naming convention
      // freezeTableName: true,
    },
  },
};
