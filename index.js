const express = require('express');
const app = express();
const PORT = 8080;

const https = require("https");

const apiKey = "e06601bb8da18db5cf87be1f9498fcf0";
//const loc = "Sarajevo";
//const api = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=" + apiKey;

app.use( express.json() )

app.listen(
    PORT,
    () => console.log('Hello')
)

/*app.get("/", function(req, res) {
    https.get(api, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            console.log(temperature);
        });
    });
    res.send("Server running");
});*/

//POST function for current weather
app.post('/weather/current', (req, res) => {

    const {location} = req.body;

    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;

    if (!location) {
        res.status(418).send({message: 'Type Location'})
    }

    https.get(api, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            console.log(temperature);

            res.send({
                current: "Temperature is " + temperature,
                loc: "Location is " + location
            });
        });
    });


});

//POST function for weather forecast
app.post('/weather/forecast', (req, res) => {

    const {location} = req.body;

    if (!location) {
        res.status(418).send({message: 'Type Location'})
    }

    res.send({
        forecast: '20 in ${location}',
    });
});

//POST function for weather history
app.post('/weather/history', (req, res) => {

    const {location} = req.body;

    if (!location) {
        res.status(418).send({message: 'Type Location'})
    }

    res.send({
        history: '20 in ${location}',
    });
});


/*app.get('/weather/forecast/:location', (req, res) => {

    res.status(200).send({
        forecast: '30'
    })
});*/
