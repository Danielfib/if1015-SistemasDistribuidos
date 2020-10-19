const Express = require("express");
const xmlparser = require("express-xml-bodyparser");
let studios = require("./studios.json");
let games = require("./games.json");
const _ = require("lodash");
const uuid = require("uuid");
const xml = require("xml");
const { rest, flatten } = require("lodash");

const app = Express();
app.use(Express.json());
app.use(xmlparser());
app.use(Express.urlencoded({ extended: true }));
const port = 8080;
const API_URL = "https://localhost:8080";

class hateoas {
    constructor(type, href, rel) {
        this.type = type;
        this.href = API_URL + href;
        this.rel = rel;
    }
}

//#region [Studios]
app.get("/studios", (req, res) => {
    console.log("received get studios request!");
    res.json(studios);
})

app.post("/studios", (req, res) => {
    console.log("received post studios request!");
    let id = uuid.v4();
    studios.push({
        id: id,
        name: req.body.name,
        games: req.body.games
    })
    console.log('now we have this many studios: ' + studios.length)
})

app.put("/studios/:studioName", (req, res) => {
    console.log("received put studios request!");
    studios.forEach(x => {
        if(x.name == req.params.studioName){
            x.games = req.body.games;
        }
    });
})

app.delete("/studios/:studioName", (req, res) => {
    console.log("received delete studios request! With name: " + req.params.studioName);
    studios = studios.filter((studio) => studio.name != req.params.studioName);
})
//#endregion

//#region [Games]
app.get("/games", (req, res) => {
    console.log("received get games request!");
    res.json(games);
})

app.post("/games", (req, res) => {
    console.log("received post games request!");
    let id = uuid.v4();
    games.push({
        id: id,
        name: req.body.name,
        year: req.body.year
    })
    console.log('now we have this many games: ' + games.length)
})

app.put("/games/:gameName", (req, res) => {
    console.log("received put games request!");
    games.forEach(x => {
        if(x.name == req.params.gameName){
            x.year = req.body.year;
        }
    })
})

app.delete("/games/:gameName", (req, res) => {
    console.log("received delete games request!");
    games = games.filter((game) => game.name != req.params.name);
})
//#endregion

app.listen(port);