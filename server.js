const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 5003;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jsonfile = require('jsonfile');

const dbPath = path.join(__dirname, "db.json");

let likeCount = 0;

// Load the like count from the database if it exists
if (fs.existsSync(dbPath)) {
  const data = jsonfile.readFileSync(dbPath);
  likeCount = data.likeCount || 0;
}

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/like", (req, res) => {
  likeCount++;
  updateLikeCount();
  res.json({ count: likeCount });
});

app.get("/count", (req, res) => {
  res.json({ count: likeCount });
});

function updateLikeCount() {
  const data = { likeCount };
  jsonfile.writeFileSync(dbPath, data);
}

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
