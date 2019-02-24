const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');

const {
  updateCharacters,
  lastUpdated,
  combineMoveLists,
} = require('./characters');

const {PORT} = require('./config');
const app = express();

// CORS
app.use(cors());

// Logging
app.use(morgan('common'));

// Version Checking
app.use('/version/', (req, res) => {
  lastUpdated((data) => {
    return res.status(200)
      .json(data);
  });
});

// Get MoveLists
app.use('/frame-data/', (req, res) => {
  combineMoveLists((list) => {
    return res.status(200)
      .json(list);
  });
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

function runServer(port = PORT) {
  server = app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
  });
}

function closeServer() {
  console.log('Closing server');
  server.close((err) => {
    if (err) {
      console.log(err);
    }
  });
}

if (require.main === module) {
  updateCharacters();
  cron.schedule('1 */12 * * *', function() {
    updateCharacters(); // Every 12 Hours
  });
  runServer();
}

module.exports = {runServer, app, closeServer};
