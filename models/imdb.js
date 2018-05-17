// {   title: 'Jacked',
//     title_url: '/title/tt1814740/?ref_=nm_flmg_mkp_66',
//     year: '2010/III',
//     role: 'Makeup Department',
//     role_short: 'make_up_department',
//     title_id: 'tt1814740',
//     title_cast_url: 'https://www.imdb.com/title/tt1814740/fullcredits?ref_=tt_cl_sm#cast',
//     user_id: 'nm2656455' } 

module.exports = function(sequelize, DataTypes) {
    var IMDB = sequelize.define("IMDB", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      title_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      year: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      role_short: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      title_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      title_cast_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    // Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
    //   Post.belongsTo(models.Author, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return IMDB;
  };