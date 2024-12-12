const models = require('../models');

// Middleware pour vérifier si l'utilisateur est admin
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
  toggleAvailability: async (req, res) => {
    const terrainId = req.params.terrainId;
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Récupérer les informations utilisateur à partir du token
    const userId = jwtUtils.getUserId(token.split(' ')[1]);
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Vérifier si l'utilisateur est admin
    try {
      const user = await models.User.findOne({ where: { id: userId } });
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'You do not have permission to perform this action' });
      }

      // Trouver le terrain
      const terrain = await models.Terrain.findOne({ where: { id: terrainId } });
      if (!terrain) {
        return res.status(404).json({ error: 'Terrain not found' });
      }

      // Basculer la disponibilité
      terrain.isAvailable = !terrain.isAvailable;
      await terrain.save();

      return res.status(200).json({
        message: `Terrain ${terrain.isAvailable ? 'available' : 'unavailable'}`,
        terrain,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Unable to process request', details: err.message });
    }
  },
};
