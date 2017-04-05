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
      through: models.Role,
      foreignKey: "id_company"
    });
  };

  return Company;
};
