const sequelize = require('sequelize');

const connection = new sequelize("api_futebol", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

connection.authenticate().then(() => {
  console.log('Conexão estabelecida com o banco de dados.');
}).catch((error) => {
  console.error('Erro ao conectar com o banco de dados:', error);
});

module.exports = connection
