require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { constants } = require('http2');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
mongoose.connect(process.env.DB_URL);

app.listen(process.env.PORT);
