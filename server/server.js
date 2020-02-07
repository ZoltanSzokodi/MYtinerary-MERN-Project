const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./keys').mongoURI;
const app = express();

// GLOBAL MIDDLEWARES ---------------------------
// Setting up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// logs requests in the console while nodemon is listening
app.use(morgan('dev'))

// ROUTES ----------------------------------------
const cityRoutes = require('./routes/cities');
const itineraryRoutes = require('./routes/itineraries');


app.use('/cities', cityRoutes);
app.use('/itineraries', itineraryRoutes);

// GLOBAL ERROR HANDLING ------------------------
// if a request reaches this point it will be handled as an error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

// for any other error coming from other parts of the back end, e.g from the DB
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

// DATABASE -------------------------------------
// connect to db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch(err => console.log(`DB connection error - ${err}`));


// SET UP SERVER --------------------------------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});