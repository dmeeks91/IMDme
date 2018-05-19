module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("Role", {
      // sequelize will automatically generate auto-incrementing id
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
    return Role
}