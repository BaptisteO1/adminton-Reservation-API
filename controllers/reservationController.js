const { Op } = require('sequelize');
const models = require('../models');

module.exports = {
  // 1. Créer une réservation
  createReservation: async (req, res) => {
    const userId = req.userId; // Identifiant de l'utilisateur (extrait du JWT)
    const { terrainId, date, time } = req.body;

    if (!userId || !terrainId || !date || !time) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // Vérifier que la réservation est dans les horaires valides
    const validTimes = [
      '10:00', '10:45', '11:30', '12:15', '13:00', '13:45',
      '14:30', '15:15', '16:00', '16:45', '17:30', '18:15',
      '19:00', '19:45', '20:30', '21:15',
    ];
    if (!validTimes.includes(time)) {
      return res.status(400).json({ error: 'Invalid time slot' });
    }

    try {
      // Vérifier si une réservation existe déjà pour cette plage
      const existingReservation = await models.Reservation.findOne({
        where: {
          terrainId,
          date,
          time,
        },
      });

      if (existingReservation) {
        return res.status(409).json({ error: 'Time slot already reserved' });
      }

      // Créer la réservation
      const reservation = await models.Reservation.create({
        userId,
        terrainId,
        date,
        time,
      });

      return res.status(201).json({ message: 'Reservation created', reservation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unable to create reservation' });
    }
  },

  // 2. Lister les réservations disponibles
  listAvailableReservations: async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
      const reservations = await models.Reservation.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [models.Terrain, models.User],
      });

      return res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unable to fetch reservations' });
    }
  },

// ne fonctionne pas
//   getAllReservations: async (req, res) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//       return res.status(401).json({ error: 'Token missing' });
//     }

//     // Récupérer les informations utilisateur à partir du token
//     const userId = jwtUtils.getUserId(token.split(' ')[1]);
//     if (!userId) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     try {
//       // Vérifier si l'utilisateur est un administrateur
//       const user = await models.User.findOne({ where: { id: userId } });
//       if (!user || !user.isAdmin) {
//         return res.status(403).json({ error: 'You do not have permission to view all reservations' });
//       }

//       // Récupérer toutes les réservations avec les informations liées (terrain et utilisateur)
//       const reservations = await models.Reservation.findAll({
//         include: [
//           { model: models.Terrain, attributes: ['name'] },
//           { model: models.User, attributes: ['username'] },
//         ],
//         order: [['date', 'ASC'], ['time', 'ASC']], // Tri par date et heure
//       });

//       return res.status(200).json(reservations);
//     } catch (err) {
//       return res.status(500).json({ error: 'Unable to retrieve reservations', details: err.message });
//     }
//   },

  // 3. Annuler une réservation
  cancelReservation: async (req, res) => {
    const userId = req.userId; // Identifiant de l'utilisateur (extrait du JWT)
    const { reservationId } = req.params;

    try {
      const reservation = await models.Reservation.findOne({
        where: {
          id: reservationId,
          userId, // Vérifie que l'utilisateur est bien le propriétaire
        },
      });

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found or unauthorized' });
      }

      // Supprimer la réservation
      await reservation.destroy();

      return res.status(200).json({ message: 'Reservation canceled' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unable to cancel reservation' });
    }
  },
};
