const express = require('express');
const app = express();
const PORT = 8080;
const winston = require("winston");

const https = require("https");

const apiKey = "e06601bb8da18db5cf87be1f9498fcf0";

app.use( express.json() )

//Winston logger
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'C:/Users/Kenan/Desktop/APIHomework/api.log' }),
    ],
  });

app.listen(
    PORT,
    () => console.log('Hello')
)

//POST function for current weather
app.post('/weather/current', (req, res) => {
try{
    const {location} = req.body;

    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;


    if (!location) {
        res.status(418).send({message: 'Type Location'})
    }

    https.get(api, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            logger.info(weatherData);

            res.send({
                weatherData
            });
        });
        
    });
} catch (error){
    return res.status(500).json({ error: "Error" });
}
});

//POST function for forecast
app.post('/weather/forecast', (req, res) => {
    try{

    const {location} = req.body;

    const api = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey;

    https.get(api, function (response) {
        let weatherData = "";
        response.on("data", function (data) {
          weatherData = weatherData + data;
            });

        response.on("end", function () {
          const parsedWeatherData = JSON.parse(weatherData);
          logger.info(parsedWeatherData);
          res.send({
            parsedWeatherData
          });
        });
      });
    } catch(error){
        return res.status(500).json({ error: "Error" });
    }
});



//POST function for weather history
app.post('/weather/history', async (req, res) => {
    try{
        const {location} = req.body;
        const {sDate} = req.body;
        const {eDate} = req.body;

        const geoApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=" + apiKey;

        const resp = await fetch(geoApi);
        const data = await resp.json();
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const api = "https://history.openweathermap.org/data/2.5/history/city?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey ;

         https.get(api, function (response) {
            let weatherData = "";
              response.on("data", function (data) {
                 weatherData = weatherData + data;
                 });
             response.on("end", function () {
                const parsedWeatherData = JSON.parse(weatherData);
                logger.info(parsedWeatherData);
                res.send({
                 weatherData
         });
        });
     });
    } catch(error) {
        return res.status(500).json({ error: "Error" });
    }


});
