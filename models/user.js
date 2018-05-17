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
<<<<<<< HEAD
  return User
=======
  return User;
>>>>>>> 3d0ce86c100fbd518060ddcf014a205735e138db
};
  