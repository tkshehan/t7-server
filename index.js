const fs = require('fs');
const characters = require('./characters');
const characterScraper = require('./characterScraper');

characters.forEach((character) => {
  characterScraper(character, writeCharacter);

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
