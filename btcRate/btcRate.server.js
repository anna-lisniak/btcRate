const express = require('express');
const btcRateRouter = require('./routes/btcRate.router')
const app = express();

const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/btcRate', btcRateRouter);

app.listen(8000, () => {
    console.log('Server running on 8000');
})