var Request = require("request");
const readline = require("readline");
const xml = require("xml");
const xmlparser = require("express-xml-bodyparser");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
    var args = input.split(" ")
    var op = args[0]
    console.log('oi:' + op)
    var name = args[1]
    switch(op){
        case "0":
            console.log('sending post studio req')
            Request.post(
                {
                    headers: {
                        "content-type": "application/json"
                    },
                    url: "http://localhost:7474/studios",
                    body: JSON.stringify({
                        name: name,
                        games: []
                    })
                },
                (error, response, body) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(JSON.parse(response.body));
                    }
                }
            );
            break;
        case "1":
            var year = args[2]
            console.log('sending post studio req')
            Request.post(
                {
                    headers: {
                        "content-type": "application/json"
                    },
                    url: "http://localhost:7474/games",
                    body: JSON.stringify({
                        name: name,
                        year: year
                    })
                },
                (error, response, body) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(JSON.parse(response.body));
                    }
                }
            );

            break;
    }
})