import bcrypt from "bcrypt";
import { PasswordMatchConfirmationError } from "../helpers/errors";
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
        set(val) {
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
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            msg: "Password should contain 6 - 16 chars and at least one number, specific symbol and capital letter"
          }
        }
      }
    },
    {
      timestamps: false,
      tableName: "users",
      validate: {
        passwordConfirmation() {
          if (this.passwordConfirmation !== this.password) {
            throw new PasswordMatchConfirmationError(
              "Password doesn't match confirmation"
            );
          }
        }
      }
    }
  );

  User.setAssociation = models => {
    User.belongsToMany(models.Company, {
      through: models.Role,
      foreignKey: "id_user"
    });
  };

  User.beforeCreate((user, options) =>
    bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then(hashedPw => {
      user.password = hashedPw;
    }));

  return User;
};
