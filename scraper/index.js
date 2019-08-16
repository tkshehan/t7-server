const fs = require('fs').promises;
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

async function combineMoveLists() {
  const read = characters.map(readFile);
  const combined = {}
  await Promise.all(read)
    .then((results) => {
      results.forEach((data) => {
        combined[data.character] = data;
      });
    });
  return combined;

  async function readFile(character) {
    const data = await fs.readFile(`./scraper/data/${character}.json`, 'utf8');
    return JSON.parse(data);
  };
}

function lastUpdated(callBack) {
  fs.readFile('./scraper/data/version.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data);
    callBack(data);
  });
}

module.exports = {updateCharacters, combineMoveLists, lastUpdated};
