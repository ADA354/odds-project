import express from "express";
import axios from "axios";
import "dotenv/config";
import { promises as fs } from "fs";

// Store API key securely using dotenv, so it is not exposed in the code
const ODDS_API_KEY = process.env.api_key;

// Initialize an Express app
const app = express();
const port = 3000; // Define the port where the server will run

// Base URL for The Odds API
const API_URL = "https://api.the-odds-api.com/v4/";

// Serve static files from the "public" directory
app.use(express.static("public"));
// Parse URL-encoded data with the querystring library (needed for forms)
app.use(express.urlencoded({ extended: true }));

// Basic API configuration: set league, bookmaker, market, and days to display odds. You can check the API docs to change according to your needs.
let leagues = "spain_la_liga"; // Default to La Liga
let bookmakers = "betmgm"; // Default to the bookmaker "betmgm"
let markets = "h2h"; // We're interested in head-to-head (H2H) odds
let displaydays = 6; // Show matches for the next 6 days

// Set the start and end dates for the matches we want to fetch
let date = new Date(); // Get the current date and time

// Set start date to today (in Indian Standard Time)
let date_start_ist = new Date(date);
date_start_ist.setDate(date_start_ist.getDate());

// Set end date to 6 days from now
let date_end_ist = new Date(date);
date_end_ist.setDate(date_end_ist.getDate() + displaydays);
date_end_ist.setHours(23, 59, 59, 0); // End of the day

// Convert both start and end dates to ISO format (removing milliseconds) as required by the API
let date_start = date_start_ist.toISOString().split(".")[0] + "Z";
let date_end = date_end_ist.toISOString().split(".")[0] + "Z";

// Route for fetching odds and displaying them on the homepage
app.get("/", async (req, res) => {
  try {
    // Make a request to The Odds API for the specified league and time range
    const result = await axios.get(
      `${API_URL}/sports/soccer_${leagues}/odds/?apiKey=${ODDS_API_KEY}&bookmakers=${bookmakers}&markets=${markets}&commenceTimeFrom=${date_start}&commenceTimeTo=${date_end}`
    );

    // Log the remaining and used API requests because the free version is limited
    console.log("Remaining requests:", result.headers["x-requests-remaining"]);
    console.log("Used requests:", result.headers["x-requests-used"]);

    // Write the fetched data to a JSON file for reference
    const jsonData = JSON.stringify(result.data, null, 2);
    await fs.writeFile("oddsData.json", jsonData);

    // Render the data on the "index.ejs" page
    res.render("index.ejs", { data: result.data, leagues: leagues });
  } catch (error) {
    // Error handling for failed requests
    if (error.response) {
      console.log(error.response.data); // Log API response errors
      res.status(error.response.status); // Set status code from the API error
    } else {
      console.error(error.message); // Log generic errors
      res.status(500).send("An unexpected error occurred");
    }
  }
});

// Handle post requests for changing the displayed league to La Liga
app.post("/la_liga", (req, res) => {
  try {
    leagues = req.body.leagues; // Update the league to La Liga
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  res.redirect("/"); // Refresh the page to show updated results
});

// Handle post requests for changing the displayed league to Serie A
app.post("/serie_a", (req, res) => {
  try {
    leagues = req.body.leagues; // Update the league to Serie A
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  res.redirect("/"); // Refresh the page to show updated results
});

// Handle post requests for changing the displayed league to Europa League (UEL)
app.post("/uel", (req, res) => {
  try {
    leagues = req.body.leagues; // Update the league to Europa League
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status);
    } else {
      console.error(error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
  res.redirect("/"); // Refresh the page to show updated results
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`); // Log that the server is running
});
