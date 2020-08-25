const { Client } = require("pg");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

//TODO : Change querys to Parameterized Query to fight against SQL INJECTION
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});
const client = new Client({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async function connectToDatabase() {
  await pool
    .connect()
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error when Connecting to Database : ", err));
})();

/**
 * @returns Data Array with the Data from the Database
 */
async function getPopulationForPokemon(rarity) {
  let data = [];
  await pool
    .query(`SELECT * from Population where grade = '${rarity}'`)
    .then((response) => (data = response.rows));
  return data;
}

async function addToDatabase(name, amount, brand, grade, variety) {
  const query = `INSERT into population (name, amount, brand, grade, variety) values ('${name}', '${amount}' ,'${brand}', '${grade}', '${variety}');`;
  console.log(query);
  client
    .query(query)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(
        "error when trying to write to Database: Error Code:",
        err.code
      );
      if (err.code === "23505") {
        console.log("Entry already in Database, update instead");
        updateDatabaseEntriy(name, amount, brand, grade, variety);
      }
    });
}

async function updateDatabaseEntriy(name, amount, brand, grade, variety) {
  const query = `UPDATE population SET amount = ${amount} WHERE name = '${name}' AND brand = '${brand}' AND grade = '${grade}' AND variety = '${variety}';`;
  console.log(query);
  client
    .query(query)
    .then((res) => console.log("updated Database Entry successfully "))
    .catch((error) => console.log(error));
}

module.exports = { getPopulationForPokemon, addToDatabase };
