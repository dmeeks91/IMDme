module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // name of user
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // type of job - e.g. makeup artist, actor, set design etc..
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // jobs person has worked that corresponds with jobs table
    jobs: {
      type: DataTypes.TEXT,
    }
  });

  // a user should belong to a job
  User.associate = function(models) {
    // should be able to create a user even if they haven't worked a job
    User.hasMany(models.Jobs, {
      foreignKey: {
        allowNull: true
      }
    });
  };
    return User;
};
  