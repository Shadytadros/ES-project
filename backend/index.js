const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const path = require('path');
const uploadRoute = require('./routes/upload')
require('dotenv').config();
const cors = require('cors')


const app = express();
app.use(cors())

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));
//connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/', authRoute);
app.use('/', uploadRoute);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
