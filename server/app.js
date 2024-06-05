const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./database_schema/database');

const userRouter = require('./routes/user');
const infoRouter = require('./routes/info');
const journalRouter = require('./routes/journal');
const tripRouter = require('./routes/trip');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/info', infoRouter);
app.use('/journal', journalRouter);
app.use('/trip', tripRouter);

dotenv.config();

connectToDatabase();

module.exports = app;