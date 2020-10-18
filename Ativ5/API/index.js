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
const port = 7474;
const API_URL = "https://localhost:7474";

class hateoas {
    constructor(type, href, rel) {
        this.type = type;
        this.href = API_URL + href;
        this.rel = rel;
    }
}

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

app.listen(port);