const fs = require('fs');
const characters = require('./characters');
const rbnorwayScraper = require('./rbnorwayScraper');

characters.forEach((character) => {
  rbnorwayScraper(character, writeCharacter);

  function writeCharacter(moves) {
    fs.writeFile(
        `./data/${character}.json`,
        JSON.stringify(moves, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(character + ' saved');
          }
        }
    );
  }
});
