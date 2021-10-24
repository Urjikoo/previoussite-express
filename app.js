const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
// register view engine
app.set("view engine", "ejs");
app.set("views", "ejsview");
app.use(express.static("css"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/discript", (req, res) => {
  res.render("discript.ejs");
});

app.post("/", (req, res) => {
  // response.on("data", function (data) {
  const query = req.body.cityName;
  const apiKey = "d5885f215ffdfb9248e11e2db389dcbc";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const wData = JSON.parse(data);
      const temp = wData.main.temp;
      const wDiscription = wData.weather[0].description;
      const icon = wData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The temprature in " + query + "is  " + temp + " degrees.</h1>"
      );
      res.write("<h3>right now it is " + wDiscription + "</h3");
      res.write("<img src=" + imgURL + ">");

      res.send();
    });
  });
});

app.listen(4000, function () {
  console.log("server started at 4000");
});
