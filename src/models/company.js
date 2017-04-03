export default (sequelize, DataTypes) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

  }, {
    timestamps: false,
    tableName: "users"
  });

  Company.setAssociation = models => {
    Company.belongsTo(models.User, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
      foreignKey: {
        field: "super_admin_id",
        allowNull: false
      },
      as: "Owner"
    });
    Company.belongsToMany(models.User, { through: models.Role, foreignKey: "id_company" });
  };

  return Company;
}