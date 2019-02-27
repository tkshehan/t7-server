const got = require('got');
const cheerio = require('cheerio');

function rbnorwayScraper(character, callback) {
  const url = `http://rbnorway.org/${character}-t7-frames/`;

  got(url).then((response) => {
    const $ = cheerio.load(response.body);
    const rows = $('tr');

    let moves = [];
    rows.each(function(i, row) {
      const move = [];
      row.childNodes.forEach((cell) => {
        const data = $(cell).html();
        if (data !== null) {
          move.push(data);
        }
      });
      moves.push(move);
    });

    let throws = moves.filter((array) => array.length === 7)
      .filter((array) => array[0] !== '<b>Command</b>');

    moves = moves
      .filter((array) => array.length === 8)
      .filter((array) => array[0] !== '<b>Command</b>');

    moves = moves.map((move) => {
      return {
        'Command': move[0],
        'Level': move[1],
        'Damage': move[2],
        'Startup': move[3],
        'Block': move[4],
        'Hit': move[5],
        'CH': move[6],
        'Notes': move[7],
      };
    });

    const obj = {character, moves};

    if (throws.length > 0) {
      throws = throws.map((move) => {
        return {
          'Command': move[0],
          'Level': move[1],
          'Damage': move[2],
          'Startup': move[3],
          'Break': move[4],
          'BreakFrame': move[5],
          'Notes': move[6],
        };
      });
      obj.throws = throws;
    }

    return obj;
  }).then((moves) => {
    callback(moves);
  }).catch((error) => {
    throw error;
  });
}

module.exports = rbnorwayScraper;
