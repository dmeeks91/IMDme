module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      projectID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
    return Project
}