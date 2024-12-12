const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware'); // Vérifie le JWT

// Créer une réservation
router.post('/', authMiddleware, reservationController.createReservation);

// Lister les réservations disponibles
router.get('/available', reservationController.listAvailableReservations);

// Route pour récupérer toutes les réservations
// router.get('/all', reservationController.getAllReservations);

// Annuler une réservation
router.delete('/:reservationId', authMiddleware, reservationController.cancelReservation);

module.exports = router;
