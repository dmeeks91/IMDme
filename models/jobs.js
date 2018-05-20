module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    // name of job
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectID: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  return Job;
}
    