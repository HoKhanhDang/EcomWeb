const express = require('express');
const initRoutes = require('./routes');
require('dotenv').config();

const dbConnection = require('./config/dbconnection.js');
const app = express();
const port = process.env.PORT || 8888;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});