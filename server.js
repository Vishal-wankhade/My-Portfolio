const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 5001

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

let likeCount = 0;

// Load the like count from the file if it exists
if (fs.existsSync("count.txt")) {
  likeCount = parseInt(fs.readFileSync("count.txt", "utf8"));
}

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "index.html"));
});


app.get("/like", (req, res) => {
  likeCount++;
  updateLikeCountFile();
  res.json({ count: likeCount });
});

app.get("/count", (req, res) => {
  res.json({ count: likeCount });
});

function updateLikeCountFile() {
  fs.writeFileSync("count.txt", likeCount.toString());
}




  

app.listen(port, () => {
  console.log("Server listening on port "+ port);
});
