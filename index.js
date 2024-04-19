const express = require('express');
const app = express();
const bodyParse = require('body-parser');
require('./models/db');
require('dotenv').config();

app.use(express.json());
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));