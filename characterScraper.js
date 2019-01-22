const got = require('got');
const cheerio = require('cheerio');

function characterScraper(character, callback) {
  const url = `http://rbnorway.org/${character}-t7-frames/`;

  got(url).then((response) => {
    const $ = cheerio.load(response.body);
    const rawMoves = $('tr').text().split('\n');

    // Removes Table Headers
    for (let i = 0; i < 9; i++) {
      rawMoves.shift();
    }

    const moves = [];
    // If set to 0, an empty object is added to the end of the array
    while (rawMoves.length > 1) {
      rawMoves.shift(); // Remove empty entry
      moves.push({
        'Command': rawMoves.shift(),
        'HitLevel': rawMoves.shift(),
        'Damage': rawMoves.shift(),
        'Startup': rawMoves.shift(),
        'Block': rawMoves.shift(),
        'Hit': rawMoves.shift(),
        'CounterHit': rawMoves.shift(),
        'Notes': rawMoves.shift(), // May be an empty string
      });
    }
    return moves;
  }).then((moves) => {
    callback(moves);
  }).catch((error) => {
    throw error;
  });
}

module.exports = characterScraper;
