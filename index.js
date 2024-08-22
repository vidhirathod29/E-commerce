const express = require('express');
const app = express();
const bodyParse = require('body-parser');
require('./models/db');
require('dotenv').config();
const route = require('./routes/route');
const path = require('path');
const cors = require('cors');
const { handleResponse } = require('./helper/response');


app.use(express.json());
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


app.use(cors());

app.use('/api', route);

app.use(handleResponse);
app.use(require('./helper/error').handleJoiErrors);
app.use(require('./helper/error').handleErrors);


const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));