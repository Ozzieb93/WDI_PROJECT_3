const express = require('express');
const app = express();
const router = require('./config/router');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { port, dbURI } = require('./config/environment');
// const router = require('./config/router');
mongoose.connect(dbURI);

app.use('/api', router);

app.use(bodyParser.json());
app.listen(port, () => console.log(`We're up and running on port ${port}`));