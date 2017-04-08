import models from "./index";
import { DB_SYNC_FORCE, DB_ADD_SUPER_ADMIN } from "../config";

const sync = DB_SYNC_FORCE
  ? models.sequelize
      .sync({
        force: true
      })
      .then(() => {
        global.console.log("Database schema synchronized!");

        if (DB_ADD_SUPER_ADMIN) {
          return models.User
            .create({
              login: "admin",
              email: "koa.admin@mailinator.com",
              role: "admin",
              password: "Adm1n!",
              passwordConfirmation: "Adm1n!"
            })
            .then(user => {
              global.console.log(`Super admin user created with id ${user.id}`);
            })
            .catch(err => {
              global.console.error("An error occurred on creating super admin");
              global.console.error(err.message);
              process.exit(1);
            });
        }

        return Promise.resolve();
      })
  : Promise.resolve();

export default sync;
