require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const router = require('./src/routes/router');
const urlDB = process.env.urlDB;
const port = process.env.port || 5003;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('src/public'));
app.use(router);

mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => {
  console.log(`Listen port ${port}`);
});
