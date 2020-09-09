const express = require("express");
const app = express();
const apps = require("./apps-data.js");

app.get("/apps", (req, res) => {
  const { sort, genres = "" } = req.query;
  let results = apps;

  if (sort) {
    if (!["rating", "app"].includes(sort.toLowerCase())) {
      return res.status(400).send("Sort must be one of rating or app.");
    }
  }
  if (genres) {
    if (
      !["action", "puzzle", "stragegy", "casual", "arcade", "card"].includes(
        genres.toLowerCase()
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', or 'Card."
        );
    }
    results = apps.filter((app) =>
      app.Genres.toLowerCase().includes(genres.toLowerCase())
    );
  }

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});

module.exports = app;
