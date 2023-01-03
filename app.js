require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const { constants } = require('http2');
const helmet = require('helmet');
const cors = require('cors');
const { appRouter } = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/films');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);

// Роутинг
app.use(appRouter);

app.use(errorLogger);

// Централизованный обработчик ошибок
app.use(errors());

app.use(errorsHandler);

app.listen(process.env.PORT ? process.env.PORT : 3000);
