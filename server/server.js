const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./keys').mongoURI;
const app = express();

// Setting up GLOBAL MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// logs requests in the console while nodemon is listening
app.use(morgan('dev'))

// routes that handle requests
const cityRoutes = require('./routes/cities');
const itineraryRoutes = require('./routes/itineraries');

app.use('/cities', cityRoutes);
app.use('/itineraries', itineraryRoutes);

// if a request reaches this point it will be handled as an error
app.use((req, res, next) => {
  const error = new Error('Requested route not found');
  error.status = 404;
  next(error);
})

// // for any other error coming from other parts of the back end, e.g from the DB
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

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