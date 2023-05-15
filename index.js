const express = require('express');
const app = express();
const PORT = 8080;

const https = require("https");

const apiKey = "e06601bb8da18db5cf87be1f9498fcf0";

app.use( express.json() )

app.listen(
    PORT,
    () => console.log('Hello')
)

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


app.post('/weather/forecast', (req, res) => {

    const {location} = req.body;

    const api = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey;

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



//POST function for weather history
app.post('/weather/history', (req, res) => {


});



