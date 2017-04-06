export default (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "companies"
    }
  );

  Company.setAssociation = models => {
    Company.belongsTo(models.User, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
      foreignKey: {
        field: "id_super_admin",
        allowNull: false
      },
      targetKey: "id",
      as: "Owner"
    });
    Company.belongsToMany(models.User, {
      as: { singular: "Employee", plural: "Employees" },
      through: { model: models.Role, unique: true },
      foreignKey: "id_company"
    });
    Company.belongsToMany(models.User, {
      as: { singular: "Admin", plural: "Admins" },
      through: { model: models.Role, unique: true, scope: { role: "admin" } },
      foreignKey: "id_company"
    });
    Company.belongsToMany(models.User, {
      as: { singular: "User", plural: "Users" },
      through: { model: models.Role, unique: true, scope: { role: "user" } },
      foreignKey: "id_company"
    });
  };

  return Company;
};
