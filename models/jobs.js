module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
      // name of job
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // dates of job?
      dates: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // people who have worked this job
      people: {
        type: DataTypes.TEXT,
      }
    });
  
    // a job should belong to a user
    Job.associate = function(models) {
        Job.belongsTo(models.User, {
          // must have someone who worked the job for it to exist
          foreignKey: {
            allowNull: false
          }
        });
    };

      return Job;
  };
    