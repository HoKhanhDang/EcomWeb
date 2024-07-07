const express = require('express');
const initRoutes = require('./routes');
require('dotenv').config();

const dbConnection = require('./config/dbconnection.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors(
    {
        origin: 'https://ecom-web-api.vercel.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(cookieParser());
const port = process.env.PORT || 8888;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
