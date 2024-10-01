# Odds Project

**Odds Project** is a web application that fetches real-time football odds for upcoming matches from [The Odds API](https://the-odds-api.com/) using Axios, Node.js, and Express. The app displays upcoming matches for the next 7 days in **La Liga**, **Serie A**, and the **Europa League**, along with the head-to-head (H2H) odds for each match.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

This project pulls real-time data on football matches and their respective betting odds. Users can view upcoming matches for the next week in top European leagues like La Liga, Serie A, and the Europa League, along with the associated head-to-head odds. 

The data is fetched from [The Odds API](https://the-odds-api.com/) and displayed in a clean, user-friendly format.

## Features

- **Real-time Football Odds**: Fetches and displays the latest betting odds for upcoming matches.
- **Supported Leagues**: La Liga, Serie A, and the Europa League.
- **Next 7 Days**: Displays matches and odds for the upcoming 7 days.

## Installation

Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/ADA354/odds-project.git
   ```

2. Navigate into the project directory:
   ```bash
   cd odds-project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your API key from [The Odds API](https://the-odds-api.com/):
   ```
   API_KEY="YOUR_API_KEY"
   ```

5. Start the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, it will fetch real-time football odds for upcoming matches in La Liga, Serie A, and the Europa League for the next 7 days. Head-to-head odds will be displayed for each match. Make sure to add your API key in the `.env` file to enable data fetching.

---

This version omits the license section. Let me know if this works for you!
