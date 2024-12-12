 
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
var apiRouter = require('./apiRouter').router;
const reservationRoutes = require('./routes/reservationRoutes');
const terrainRoutes = require('./routes/terrainRoutes');


// initialisation
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// déclaration du port
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).send('<h1>Badminton Reservation API</h1>');
});

app.use('/', apiRouter);

app.use('/reservations', reservationRoutes);

app.use('/terrains', terrainRoutes);

app.listen(PORT, () => {
    console.log(`Le server tourne sur http://localhost:${PORT}`);
})

const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Database synchronization error:', err);
});