require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const LoggerService = require('./services/logger.service');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(8083, async () => {
    const loggerService = new LoggerService(process.env.AMQP_SERVER, process.env.QUEUE);
    const channel = await loggerService.createChannel();
    loggerService.listenChannel(channel);
    console.log('Server running on 5672');
})



