const express = require("express");
const router = express.Router();
const { getPopulationForPokemon } = require("./databaseController.js");
const { collectDataFromParseHubProject } = require("./parseHubController.js");

router.post("/hook", async (req, res) => {
  console.log("Webhook hat mir eine nachricht geschrieben");
  let response = JSON.parse(JSON.stringify(req.body));

  if (response.status === "complete") {
    await collectDataFromParseHubProject(response.run_token);
  }
  res.status(200).end(); // Responding is important
});

router.get("/api/getChartData/", async (req, res) => {
  let grade = req.query.grade;
  let chartData = await getPopulationForPokemon(grade);
  res.json(chartData);
});

module.exports = router;
