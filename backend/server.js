/** @format */

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

// app
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

// Middlewares
app.use(morgan('dev')); // display network info in terminal
app.use(bodyParser.json({ limit: '2mb' })); // JSON data >> JS Object
app.use(cors());

// routes middleware - Import and Use routes dynamically!
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
