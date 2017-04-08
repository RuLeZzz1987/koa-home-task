import Sequelize from "sequelize";
import path from "path";
import Promise from "bluebird";
import * as Constants from "../config";

const sequelize = new Sequelize(
  Constants.DB_NAME,
  Constants.DB_USER_NAME,
  Constants.DB_USER_PASSWORD,
  {
    host: Constants.DB_HOST,
    dialect: Constants.DB_TYPE,
    port: Constants.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

sequelize.Promise = Promise;

const db = {
  User: sequelize.import(path.resolve(__dirname, "user.js")),
  Company: sequelize.import(path.resolve(__dirname, "company.js")),
  Role: sequelize.import(path.resolve(__dirname, "role.js"))
};

Object.keys(db).forEach(modelName => {
  if ("setAssociation" in db[modelName]) {
    db[modelName].setAssociation(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
