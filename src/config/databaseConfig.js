const databaseConfigs = {
  dialect: "postgres",
  host: process.env.POSTGRES_SERVER_HOST,
  username: "postgres",
  password: "postgres",
  database: process.env.POSTGRES_SERVER_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
};

export default databaseConfigs;
