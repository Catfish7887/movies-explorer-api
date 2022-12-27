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
mongoose.connect(process.env.DB_URL);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
// Роутинг. Чтобы не грузить app.js, вынес роуты в отдельные файлы
app.use(appRouter);

app.use(errorLogger);

app.use(errors());

// Централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(process.env.PORT);
