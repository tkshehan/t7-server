const got = require('got');
const cheerio = require('cheerio');

function characterScraper(character) {
  const url = `http://rbnorway.org/${character}-t7-frames/`;

  let $;
  got(url).then((response) => {
    $ = cheerio.load(response.body);
    const rawMoves = $('tr').text().split('\n');

    // Removes Table Headers
    for (let i = 0; i < 9; i++) {
      rawMoves.shift();
    }

    const moves = [];
    while (rawMoves.length > 0) {
      rawMoves.shift(); // Remove empty entry
      moves.push({
        'Command': rawMoves.shift(),
        'HitLevel': rawMoves.shift(),
        'Damage': rawMoves.shift(),
        'Startup': rawMoves.shift(),
        'Block': rawMoves.shift(),
        'Hit': rawMoves.shift(),
        'CounterHit': rawMoves.shift(),
        'Notes': rawMoves.shift(),
      });
    }
    return {
      character,
      moves,
    };
  }).catch((error) => {
    console.log(error.response.body);
  });
}

module.exports = characterScraper;
