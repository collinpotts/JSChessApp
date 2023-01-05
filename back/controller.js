require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const openingList = [];

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
            drop table if exists pieces;

            CREATE TABLE pieces (
                piece_id SERIAL PRIMARY KEY,
                board_id INTEGER NOT NULL,
                opening_name VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                color VARCHAR(255) NOT NULL,
                position INTEGER NOT NULL
              );
              
              INSERT INTO pieces (board_id, opening_name, name, color, position)
              VALUES
                (1,'default', 'rook', 'black', 0),
                (1,'default','knight', 'black', 1),
                (1,'default', 'bishop', 'black', 2),
                (1,'default', 'queen', 'black', 3),
                (1,'default', 'king', 'black', 4),
                (1,'default', 'bishop', 'black', 5),
                (1,'default', 'knight', 'black', 6),
                (1,'default', 'rook', 'black', 7),
                (1,'default', 'pawn', 'black', 8),
                (1,'default', 'pawn', 'black', 9),
                (1,'default', 'pawn', 'black', 10),
                (1,'default', 'pawn', 'black', 11),
                (1,'default', 'pawn', 'black', 12),
                (1,'default', 'pawn', 'black', 13),
                (1,'default', 'pawn', 'black', 14),
                (1,'default', 'pawn', 'black', 15),
                (1,'default', 'pawn', 'white', 48),
                (1,'default', 'pawn', 'white', 49),
                (1,'default', 'pawn', 'white', 50),
                (1,'default', 'pawn', 'white', 51),
                (1,'default', 'pawn', 'white', 52),
                (1,'default', 'pawn', 'white', 53),
                (1,'default', 'pawn', 'white', 54),
                (1,'default', 'pawn', 'white', 55),
                (1,'default', 'rook', 'white', 56),
                (1,'default', 'knight', 'white', 57),
                (1,'default', 'bishop', 'white', 58),
                (1,'default', 'queen', 'white', 59),
                (1,'default', 'king', 'white', 60),
                (1,'default', 'bishop', 'white', 61),
                (1,'default', 'knight', 'white', 62),
                (1,'default', 'rook', 'white', 63);
        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  addOpening: (req, res) => {
    const { openingName, positions } = req.body;

    sequelize
      .query(
        `
              SELECT MAX(board_id) as max_board_id
              FROM pieces;
            `
      )
      .then(([results]) => {
        const maxBoardId = results[0].max_board_id || 0;
        const boardId = maxBoardId + 1;
        const values = positions
          .map((position) => {
            return `('${openingName}', ${boardId}, '${position.name}', '${position.color}', ${position.position})`;
          })
          .join(",");
        return sequelize.query(`
                INSERT INTO pieces (opening_name, board_id, name, color, position)
                VALUES ${values};
              `);
      })
      .then(() => {
        return sequelize.query(`
                SELECT DISTINCT opening_name
                FROM pieces;
              `);
      })
      .then(([results]) => {
        const openingNames = results.map((row) => row.opening_name);
        const filteredOpeningNames = openingNames.filter(
          (name) => name !== "default"
        );
        res.send(filteredOpeningNames);
      })
      .catch((err) => {
        console.log(`Error saving opening to database: ${err}`);
        res.sendStatus(500);
      });
  },

  getPositions: (req, res) => {
    const { openingName } = req.params;
    sequelize
      .query(
        `
          SELECT name, color, position
          FROM pieces
          WHERE opening_name = '${openingName}';
        `
      )
      .then(([results]) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(
          `Error retrieving positions for opening ${openingName}: ${err}`
        );
        res.sendStatus(500);
      });
  },
};
