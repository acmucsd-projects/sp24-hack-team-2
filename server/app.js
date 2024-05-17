const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./database_schema/database');

const usersRouter = require('./routes/users');
const travelRoutes = require('./routes/routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/routes', travelRoutes);

dotenv.config();

connectToDatabase();

module.exports = app;
