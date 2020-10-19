var Request = require("request");
const readline = require("readline");
const xml = require("xml");
const xmlparser = require("express-xml-bodyparser");
const { request } = require("http");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
    var args = input.split(" ")
    var op = args[0]
    var list = args[1]

    if(list === 'games'){
        var name = args[2]
        switch(op){
            case "get":
                console.log('sending get game req')
                Request.get(
                    "http://localhost:8080/games", 
                    (error, res, body) => {
                        if(error){
                            console.log(error);
                        } else {
                            console.log(JSON.parse(res.body));
                        }
                    }
                )
            case "post":
                var year = args[3]
                console.log('sending post game req')
                Request.post(
                    {
                        headers: {
                            "content-type": "application/json"
                        },
                        url: "http://localhost:8080/games/",
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
            case "put":
                var year = args[3]
                console.log('sending put game req');
                Request.put(
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                        url: "http://localhost:8080/games/" + name,
                        body: JSON.stringify({
                            year: year
                        })
                    }
                )
                break;
            case "delete":
                console.log('sending delete game req');
                Request.delete(
                    "http://localhost:8080/games/" + name,
                    (error, response, body) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(JSON.parse(response.body));
                        }
                    }
                )
                break;
        }
    } else if (list === 'studios'){
        var name = args[2]
        switch(op){
            case "get":
                Request.get(
                    "http://localhost:8080/studios", 
                    (error, res, body) => {
                        if(error){
                            console.log(error);
                        } else {
                            console.log(JSON.parse(res.body));
                        }
                    }
                )
                break;
            case "post":
                console.log('sending post studio req')
                Request.post(
                    {
                        headers: {
                            "content-type": "application/json"
                        },
                        url: "http://localhost:8080/studios",
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
            case "put":
                console.log('sending put studio req')
                Request.put(
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                        url: "http://localhost:8080/studios/" + name,
                        body: JSON.stringify({
                            games: []
                        })
                    }
                )
                break;
            case "delete":
                console.log('sending delete studio req')
                Request.delete(
                    "http://localhost:8080/studios/" + name,
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
    } else {
        console.log('bad format, try again');
    }
})