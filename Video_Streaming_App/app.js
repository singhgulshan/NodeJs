const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

global.__root   = __dirname + '/'; 

app.get('/api', (req, res) => {
  res.status(200).send('API works.');
});

const ReservationController = require(__root + 'Video/VideoController');
app.use('/api/video', ReservationController);


module.exports = app;