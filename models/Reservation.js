const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Reservation = sequelize.define('Reservation', {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Reservation.associate = function (models) {
      // Chaque réservation appartient à un utilisateur et un terrain
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
      Reservation.belongsTo(models.Terrain, { foreignKey: 'terrainId' });
    };
  
    return Reservation;
  };
  