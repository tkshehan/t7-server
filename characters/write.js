const fs = require('fs');

// Check the new moveset against the old one, if there are
// any changes update the file and update the version date.
function writeCharacter(moves) {
  const newData = JSON.stringify(moves, null, 2);
  fs.readFile(`./data/${moves.character}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (newData !== data) {
      fs.writeFile(
          `./data/${moves.character}.json`,
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
      './data/version.json',
      JSON.stringify({updated: date.toUTCString()}, null, 2),
      'utf8',
      (err) => {
        if (err) console.log(err);
      }
  );
}

module.exports = {writeCharacter};
