const fs = require('fs');
const characters = require('./characters');
const rbnorwayScraper = require('./rbnorwayScraper');
const {writeCharacter} = require('./write');

function updateCharacters() {
  console.log('---------------------');
  console.log('checking rbnorway');
  characters.forEach((character) => {
    rbnorwayScraper(character, writeCharacter);
  });
}

function combineMoveLists(callBack) {
  const moveLists = {};
  characters.forEach((character) => {
    fs.readFile(`./data/${character}.json`, 'utf8', (err, data) => {
      if (err) console.log(err);
      data = JSON.parse(data);
      moveLists[character] = data;

      if (Object.keys(moveLists).length === characters.length) {
        callBack(moveLists);
      }
    });
  });
}

function lastUpdated(callBack) {
  fs.readFile('./data/version.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data);
    callBack(data);
  });
}

module.exports = {updateCharacters, combineMoveLists, lastUpdated};
