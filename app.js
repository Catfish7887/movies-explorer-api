require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { errors } = require('celebrate');
// const { constants } = require('http2');
const helmet = require('helmet');
const cors = require('cors');
const { appRouter } = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();
mongoose.connect(process.env.DB_URL);
mongoose.set('strictQuery', true);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Роутинг. Чтобы не грузить app.js, вынес роуты в отдельные файлы
app.use(appRouter);

// Централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(process.env.PORT);
