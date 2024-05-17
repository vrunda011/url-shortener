const express = require("express");
const mongoose = require("mongoose");
const shortId = require("short-unique-id");
const bodyParser = require("body-parser");

const app = express();
const PORT = 10000;

//  Middleware to process incoming HTTP request data in JSON
app.use(bodyParser.json());

// Global logging middleware
app.use((req, res, next) => {
  let logData = `${new Date().toISOString} | ${req.url} | ${req.method}`;
  console.log(logData);
  next();
});

// Local module or Custom Module
const { connectDB } = require("./db");

connectDB();

// import mongodb models
const Url = require("./models/urlModel");

app.post("/shorten", async (req, res) => {
  const { fullUrl } = req.body;

  // Basic URL Validation
  if (!isValidUrl(fullUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  // Check if there is an already existing hash for the given url
  const exitsingUrl = await Url.findOne({ fullUrl });
  if (exitsingUrl) {
    return res.json({ shortId: exitsingUrl.shortId });
  } else {
    // Generate a unique Id
    const shortId = shortId.generate();

    // Create a new URL with shortId and fullUrl
    const newUrl = new Url({ fullUrl, shortId });

    try {
      const savedUrl = await newUrl.save();
      res.json({ shortId: savedUrl.shortId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

function isValidUrl(url) {
  // Regular expression for URL validation
  const urlRegex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;
}

app.get("/", (req, res) => {
  res.send("Hello Welcome to Awesome Cheesecakes!");
});

app.get("/about", (req, res) => {
  res.send("<h2>We are Vadodara's best cheesecake factory!</h2>");
});

app.get("/contact", (req, res) => {
  res.json({
    number: "+91 3278217890",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} ...`);
});
