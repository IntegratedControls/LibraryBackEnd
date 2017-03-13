
const path       = require('path');
const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');
const config = require('./config');
const routes = require('./routes');
const cors = require('cors');

// TODO: Figure out why process.env.NODE_ENV is undefined at start

const corsOptions =
{ origin: JSON.parse(process.env.AllowUrl).urls,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app  = express();
app.use(express.static(path.normalize(path.join(__dirname, 'frontend/dist'))));

app.use(cors(corsOptions));
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGO_DB_URI);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', routes);
app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});
module.exports = app;
