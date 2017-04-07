import Sequelize from "sequelize";
import path from "path";
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

sequelize.Promise = global.Promise;

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

let sync;

if (process.env.DB_SYNC_FORCE) {
  sync = sequelize.sync({
    force: true
  })
    .then(() => {
      global.console.log("Database schema synchronized!");
    });
}

if (process.env.DB_ADD_SUPER_ADMIN) {
  sync = sync.then instanceof Function ? sync : Promise.resolve();
  sync
    .then(() => db.User.create({
      login: "admin",
      email: "koa.admin@mailinator.com",
      role: "admin",
      password: "Adm1n!",
      passwordConfirmation: "Adm1n!"
    }))
    .then(user => {
      global.console.log(`Super admin user created with id ${user.id}`);
    })
    .catch(err => {
      global.console.error("An error occurred on creating super admin");
      global.console.error(err.message);
      process.exit(1);
    });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
