const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// exports.sequelize = new Sequelize(
//   process.env.DB_NAME,
//   "root",
//   process.env.DB_PASSWORD,
//   {
//     host: "localhost",
//     dialect: "mysql",
//     logging: false,
//     port: 3367,
//   }
// );

exports.sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_INSTANCE,
    logging: false,
    dialectOptions: {
      socketPath: "/cloudsql/" + process.env.DB_INSTANCE,
    },
  }
);
