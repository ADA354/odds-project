import express from "express";
import axios from "axios";
import "dotenv/config";
import { promises as fs } from "fs";

//Store API KEY using dotenv so that it is hidden
const ODDS_API_KEY = process.env.api_key;
//express app initialization
const app = express();
const port = 3000;
//odds api url
const API_URL = "https://api.the-odds-api.com/v4/";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//setting basic api requirements
let leagues = "spain_la_liga";
let bookmakers = "betmgm";
let markets = "h2h";
let displaydays = 6;

//creating commencement time of matches using Date() module
let date = new Date();
//sets start date to from now on
let date_start_ist = new Date(date);
date_start_ist.setDate(date_start_ist.getDate());
//sets end date to 1 week later
let date_end_ist = new Date(date);
date_end_ist.setDate(date_end_ist.getDate() + displaydays);
date_end_ist.setHours(23, 59, 59, 0);
// Convert to ISO strings and remove milliseconds
let date_start = date_start_ist.toISOString().split(".")[0] + "Z";
let date_end = date_end_ist.toISOString().split(".")[0] + "Z";

//axios gets the requested games from the api
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      `${API_URL}/sports/soccer_${leagues}/odds/?apiKey=${ODDS_API_KEY}&bookmakers=${bookmakers}&markets=${markets}&commenceTimeFrom=${date_start}&commenceTimeTo=${date_end}`
    );

    //check no. of requests made
    console.log("Remaining requests:", result.headers["x-requests-remaining"]);
    console.log("Used requests:", result.headers["x-requests-used"]);

    // writing our data to a json file using fs module
    const jsonData = JSON.stringify(result.data, null, 2);
    await fs.writeFile("oddsData.json", jsonData);

    res.render("index.ejs", { data: result.data, leagues: leagues });
  } catch (error) {
    //error handling
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
});

//3 post requests for 3 different buttons
app.post("/la_liga", (req, res) => {
  try {
    //changing the leagues to display desired leeague matches
    leagues = req.body.leagues;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  //get "/" with updated values
  res.redirect("/");
});

app.post("/serie_a", (req, res) => {
  try {
    leagues = req.body.leagues;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  res.redirect("/");
});

app.post("/uel", (req, res) => {
  try {
    leagues = req.body.leagues;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
