const fs = require('fs');
const PATH = './scraper/data';

// Check the new moveset against the old one, if there are
// any changes update the file and update the version date.
function writeCharacter(moves) {
  const newData = JSON.stringify(moves, null, 2);
  fs.readFile(`${PATH}/${moves.character}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // Check if the new data is valid
    if (moves.moves.length === 0) {
      console.log(`Invalid data, not updating ${moves.character}`);
      // Needs further checking
      return;
    }

    // Check if data is different from old data
    if (newData !== data) {
      console.log('updating ' + moves.character);
      fs.writeFile(
        `${PATH}/${moves.character}.json`,
        JSON.stringify(moves, null, 2),
        'utf8',
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(moves.character + ' updated');
            updateVersion();
          }
        }
      );
    }
  });
}

function updateVersion() {
  const date = new Date();
  fs.writeFile(
    `${PATH}/version.json`,
    JSON.stringify({updated: date.toUTCString()}, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
        console.log('updatedVersion in write.js');
      } else {
        console.log('Updated: ' + date.toUTCString());
      }
    }
  );
}

module.exports = {writeCharacter};
