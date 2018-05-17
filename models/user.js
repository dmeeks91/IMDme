module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      // unique imdb id
      userID: {
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
  return User;
};
  