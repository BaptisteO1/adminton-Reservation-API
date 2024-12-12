const express = require('express');
const router = express.Router();
const terrainController = require('../controllers/terrainController');

// Route pour basculer la disponibilité d'un terrain (admin uniquement)
router.put('/:terrainId/toggle-availability', terrainController.toggleAvailability);

module.exports = router;
