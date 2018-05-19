module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      // unique imdb id
      googleID: {
        type: DataTypes.STRING,
        allowNull: true, //Need to allow null inorder to handle adding users from scrape who do not currently have an IMDme account
      },
      imdbID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull:true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  });
  return User;
};
  