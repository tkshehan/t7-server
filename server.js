const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cors = require('cors');
const cron = require('node-cron');

const {
  updateCharacters,
  lastUpdated,
  combineMoveLists,
} = require('./scraper');

const convertData = require('./convertData');

const {DATABASE_URL, PORT} = require('./config');
const app = express();

// CORS
app.use(cors());
// Logging
app.use(morgan('common'));

const {frameDataRouter} = require('./frame-data');
app.use('/api/frame-data', frameDataRouter);

// Version Checking
app.use('/version/', (req, res) => {
  lastUpdated((data) => {
    return res.status(200)
      .json(data);
  });
});

// Get MoveLists
app.use('/frame-data/', async (req, res) => {
  const list = await combineMoveLists();
  return res.status(200)
    .json(list);
});

// Root
app.use('/', (req, res) => {
  return res.status(200)
    .json({
      'endpoints': {
        '/version': 'Check The Last Date Updated',
        '/frame-data': 'Retrieve All Frame Data',
      },
    });
});

// 404 Error
app.use('*', (req, res) => {
  return res.status(404).json({message: '404 Not Found'});
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  convertData();
  // updateCharacters();
  cron.schedule('1 */12 * * *', function() {
    updateCharacters(); // Every 12 Hours
  });
  runServer(DATABASE_URL).catch((err) => console.error(err));
}

module.exports = {runServer, app, closeServer};
