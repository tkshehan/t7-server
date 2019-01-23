const fs = require('fs');
const characters = require('./characters');
const rbnorwayScraper = require('./rbnorwayScraper');
const {writeCharacter} = require('./write');

function updateCharacters() {
  characters.forEach((character) => {
    rbnorwayScraper(character, writeCharacter);
  });
}

function lastUpdated() {
  fs.readFile('./data/version.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
}

module.exports = {updateCharacters, lastUpdated};
