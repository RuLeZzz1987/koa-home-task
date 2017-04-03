export default (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    role: {
      type: DataTypes.STRING(5)
  }}, {
    timestamps: false,
    tableName: "roles"
  });

  return Role;
}