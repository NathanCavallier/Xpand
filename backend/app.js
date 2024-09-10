const express = require('express');
const cors = require('cors');


const app = express(); // Create the Express app

app.use(express.json()); // Middleware that transforms the request body into a JSON object

app.use(cors()); // Middleware that allows requests from different origins

app.use((req, res, next) => { // Middleware that sets the headers of the response to allow requests from any origin with the methods GET, POST, PUT, DELETE, PATCH, OPTIONS and to include the headers Origin, X-Requested-With, Content, Accept, Content-Type, Authorization
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;