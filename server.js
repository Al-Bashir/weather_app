// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Global Variable
const port = 4000;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Make endpoint to receive data from client-side.
app.post('/receivedData', (req, res) => {
    projectData.collectedData = req.body;
    res.send();
})

// Make endpoint to sed data to client-side.
app.get('/sendData', (req, res) => {
    res.send(projectData.collectedData);
})

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log("The Server Is Successfully Running.");
})

