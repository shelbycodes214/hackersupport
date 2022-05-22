/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 *
 * The API returns the front-end UI handlebars pages, or
 * Raw json if the client requests it with a query parameter ?raw=json
 */

// Utilities we need
const fs = require("fs");
const path = require("path");
const http = require("http");
const { engine } = require("express-handlebars");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.set('views', __dirname + '/src/pages');

app.engine('hbs', engine({ 
  extname: "hbs",
  layoutsDir: "/app/src/layouts",
  defaultLayout: 'main'
}));
app.set("view engine", 'hbs');



const allVotes = []
let id = 0;
function castVote(siteName, quickLearning, easyToUse, networking, careerProgression) {
  allVotes.push({
    id: ++id,
    siteName,
    quickLearning,
    easyToUse,
    networking,
    careerProgression,
    createdAt: new Date()
  });
}



// home endpoint that is dynamically rendered with provided data
app.get("/hvotes", (req, res) => {
  console.log(allVotes);
    res.render('', { 
      votes: allVotes
    });
})


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// reponse to the button catergories 

// cast a vote for :named page
app.post("/:site/vote", (request, response) => {
  const siteName = request.params.site;
  
  const { quickLearning, easyToUse, networking, careerProgression } = request.body;
  
  if (!quickLearning || !easyToUse || !networking || !careerProgression) {
    console.error("fill all fields!");
    // response.send("fill all fields!");
    return;
  }
    
  castVote(
    siteName,
    quickLearning,
    easyToUse,
    networking,
    careerProgression
  );
  return response.redirect("/");
})

// all votes
app.get('/votes', (request, response) => {
  console.log("All votes: ", allVotes);
  return allVotes;
})

// votes for a :named page
app.get('/:site/votes', (request, response) => {
  const site = request.params.site;
  
  let siteVotes = allVotes.filter(vote => vote.siteName === site);
  let count = siteVotes.length;
  
  console.log(`${site} has ${count} votes: `, siteVotes);
  response.send(siteVotes);
})



const server = http.createServer({}, app);

server.listen(process.env.PORT, () => {
  console.log("Application started!");
});