const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const path = require('path');
const uploadRoute = require('./routes/upload')
require('dotenv').config();
const User = require('./models/user');
const Router = require('./routes/Router')


const app = express();

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));
//connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

app.use(express.json());

// app.use('/', authRoute);
app.use('/upload', uploadRoute);

new Router(app, User);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
