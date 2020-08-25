// Import Node Modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const router = require("./router");

// Initialize express and define a port
const app = express();
const PORT = 4000;

//Define CORS Options and Whitelist
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Tell express to use body-parser's JSON parsing, define Routes and use CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/*const PROJECT_TOKEN = process.env.PROJECT_TOKEN;
const parseHubController = require("./parseHubController");
parseHubController.startParseHubProject(PROJECT_TOKEN);*/
//test