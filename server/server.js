const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./keys').mongoURI;

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use('/cities', require('./routes/cities'));

// connect to db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch(err => console.log(`DB connection error - ${err}`));

// set up server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});