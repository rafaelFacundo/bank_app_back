module.exports = {
  dialect: "postgres",
  host: process.env.POSTGRES_SERVER_HOST,
  username: "postgres",
  password: "postgres",
  database: "mubank",
  define: {
    timestamps: true,
    underscored: true,
  },
};
