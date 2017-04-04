export default (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role: {
      type: DataTypes.STRING(5),
      defaultValue: "user"
  }}, {
    timestamps: false,
    tableName: "roles"
  });

  return Role;
}