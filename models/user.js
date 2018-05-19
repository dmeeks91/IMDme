module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      // unique imdb id
      googleID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imdbID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  });
  return User;
};
  