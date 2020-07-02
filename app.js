const express = require("express");
const bodyParser = require("body-parser");
const Crawler = require('simplecrawler');
const ejs = require("ejs");

// Initiating express()
const app = express();

// Configuring application use public folder to serve static files
app.use(express.static("public"));

//  Configuring application to use bodyParser to read data from request
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.get("/sitemap", function(req, res) {

  const link = req.query.url

  console.log("URL received by crawler" + link);

  const crawlerInterval = req.query.crawlerInterval
  const maxConcurrency = req.query.maxConcurrency
  const maxDepth = req.query.maxDepth

  var crawler = Crawler(link)
    .on("fetchcomplete", function() {
      console.log("Fetched a resource!")
    });

  crawler.interval = crawlerInterval; // Ten seconds
  crawler.maxConcurrency = maxConcurrency;

  crawler.maxDepth = maxDepth; // Etc.

  const pages = {};

  crawler.on("discoverycomplete", function(queueItem, resources) {
    console.log("Scan completed")
    res.send(resources)
    // console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    // console.log("It was a resource of type %s", response.headers['content-type']);
  });

  crawler.start()

  // console.log(pages)

});

// Configuring listening port for the application, works on heroku and localhost
app.listen(process.env.PORT || 4000, function() {
  console.log("Server is running");
});
