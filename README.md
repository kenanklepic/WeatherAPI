# Weather API

This is a Node.js application that provides weather data using the OpenWeatherMap API. It allows users to retrieve current weather, weather forecast, and weather history based on location.

## Prerequisites

- Node.js installed on your machine
- OpenWeatherMap API key

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command: `npm install`


## Usage

1. Replace the placeholder `apiKey` in the code with your own OpenWeatherMap API key.

2. Start the server by running the following command: `node index.js`


3. The server will start running on `http://localhost:8080`.

4. Use a tool like Postman or any API testing tool to make HTTP requests to the server.

## API Endpoints

### POST /weather/current

Retrieves the current weather for a specific location.

- Request:
- Body parameters:
 - `location` (string): The name of the location.
- Example:
 ```json
 {
   "location": "London"
 }
 ```


### POST /weather/forecast

Retrieves the weather forecast for a specific location.

- Request:
- Body parameters:
 - `location` (string): The name of the location.
- Example:
 ```json
 {
   "location": "London"
 }
 ```

### POST /weather/history

Retrieves the weather history for a specific location within a given date range.

- Request:
- Body parameters:
 - `location` (string): The name of the location.
 - `sDate` (string): The start date of the weather history (format: Unix Time).
 - `eDate` (string): The end date of the weather history (format: Unix Time).
- Example:
 ```json
 {
   "location": "London",
    "sDate": "1684429215",
    "eDate": "1684515615"
 }
 ```

## Logger
The loggs are located in the api.log file



