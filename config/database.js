const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Charger le fichier de configuration

// Récupérer l'environnement actuel ou définir "development" par défaut
const env = process.env.NODE_ENV || 'development';

// Extraire la configuration appropriée en fonction de l'environnement
const dbConfig = config[env];

// Créer une instance Sequelize avec les paramètres du fichier de configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false, // Désactivez ou activez les logs selon vos besoins
});

module.exports = sequelize;
