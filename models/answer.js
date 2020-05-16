module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    user_response: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    answer_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Answer.associate = function(models) {
    // We're saying that a Answer should belong to a User
    // An Answer can't be created without a User due to the foreign key constraint
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Answer;
};
