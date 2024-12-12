 const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  
    User.associate = function (models) {
      // Une relation utilisateur à réservation (1:N)
      User.hasMany(models.Reservation, { foreignKey: 'userId' });
    };
  
    return User;
  };
  