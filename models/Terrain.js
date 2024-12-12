const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Terrain = sequelize.define('Terrain', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  
    Terrain.associate = function (models) {
      // Une relation terrain à réservation (1:N)
      Terrain.hasMany(models.Reservation, { foreignKey: 'terrainId' });
    };
  
    return Terrain;
  };
  