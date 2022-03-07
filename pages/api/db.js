const connectionString = {
  client: "mssql",
  connection: {
    server: "sql.bsite.net",
    user: "skutis_wordgame",
    password: "wordgame123",
    options: {
      port: 14831,
      database: "skutis_wordgame",
      instanceName: "MSSQL2016",
    },
  },
};

export default connectionString;
