const path = require('path');
const gateway = require('express-gateway');
require('./user/user.server');
require('./btcRate/btcRate.server');

gateway()
  .load(path.join(__dirname, 'config'))
  .run();