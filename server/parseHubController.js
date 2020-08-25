const axios = require("axios");
const { addToDatabase } = require("./databaseController.js");
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;

async function startParseHubProject(projectToken) {
  var request = require("request");

  let url = `https://www.parsehub.com/api/v2/projects/${projectToken}/run`;

  request(
    {
      uri: url,
      method: "POST",
      form: {
        api_key: API_KEY,
      },
    },
    function (err, resp, body) {
      //console.log(err, resp, body);
    }
  );
}

/**
 * @param {String} runToken
 */
async function collectDataFromParseHubProject(runToken) {
  let successful = false;
  await axios
    .get(`https://www.parsehub.com/api/v2/runs/${runToken}/data`, {
      params: {
        api_key: API_KEY,
        format: "json",
      },
    })
    .then((result) => {
      console.log(result.data.results);
      data = result.data.results;
      data.forEach(async ({ cardname, population, brand, grade, variety }) => {
        let regeEx = /\d+/;
        let formattedGrade = regeEx.exec(grade)[0];

        await addToDatabase(
          cardname,
          population,
          brand,
          formattedGrade,
          variety
        );
      });
      successful = true;
    })
    .catch((error) => {
      console.error("Error when collecting data from ParseHub", error);
    });
  return successful;
}

module.exports = { collectDataFromParseHubProject, startParseHubProject };
