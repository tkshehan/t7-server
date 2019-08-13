const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {FrameData} = require('./models');
const {SECRET} = require('../config');

router.get('/', (res, req) => {
  FrameData.find()
    .then((data) => {
      res.json(data)
    });
});

router.get('/:character', (req, res) => {
  FrameData.find({character: req.params.character})
    .then(character => res.json(character))
    .catch(err => {
      const message = {error: 'Could not retrieve data for character'};
      console.error(err);
      res.status(500).json(message);
    });
});

router.post('/', (req, res) => {
  if (res.body.key !== SECRET) {
    const message = 'Invalid Key';
    console.error('Invalid Post Attempt');
    return res.status(400).send(message);
  }
});

module.exports = router;