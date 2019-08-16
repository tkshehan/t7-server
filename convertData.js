const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {combineMoveLists} = require('./scraper');
const {FrameData} = require('./frame-data/models');

async function convert() {
  const originalData = await combineMoveLists();
  console.log(originalData['shaheen']);
}

module.exports = convert;