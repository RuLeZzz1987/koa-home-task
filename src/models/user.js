import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../config";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      login: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        set(val="") {
          this.setDataValue("email", val.toLowerCase());
        },
        validate: {
          isEmail: {
            msg: "Provided value is not valid email address"
          }
        }
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "user"
      }
    },
    {
      timestamps: false,
      tableName: "users",
      scopes: {
        admin: {
          where: {
            role: "admin"
          }
        },
        common: {
          where: {
            role: "user"
          }
        }
      }
    }
  );

  User.setAssociation = models => {
    User.belongsToMany(models.Company, {
      through: models.Role,
      foreignKey: "id_user",
      as: { singular: "Company", plural: "Companies" }
    });

    User.hasMany(models.Company, {
      foreignKey: "id_super_admin",
      as: { singular: "Business", plural: "Businesses" }
    });
  };

  User.beforeCreate((user, options) =>
    bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then(hashedPw => {
      user.password = hashedPw;
    }));

  User.beforeUpdate((user, options) => {
    if (user.password) {
      return bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then(hashedPw => {
        user.password = hashedPw;
      });
    }

    return Promise.resolve();
  });

  return User;
};
