const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./keys').mongoURI;

// ROUTES ======================================
const cityRoutes = require('./api/routes/cities');
const itineraryRoutes = require('./api/routes/itineraries');
const userRoutes = require('./api/routes/users');
const commentRoutes = require('./api/routes/comments');

// EXPRESS & PORT CONFIG =======================
const app = express();

// MIDDLEWARES ==================================
app.use(cors());
app.use(morgan('dev'));
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./api/auth/passport');

// API ROUTES ===================================
app.use('/api/cities', cityRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// GLOBAL ERROR HANDLING ========================
// if a request reaches this point it will be handled as an error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
// for any other error coming from other parts of the back end, e.g from the DB
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error })
})

// CONNECT TO MONGO DB ==================================
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch(err => console.log(`DB connection error - ${err}`));


// SET UP SERVER =======================================
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});