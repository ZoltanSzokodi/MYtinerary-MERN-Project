const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const key = require('../../keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.JWT_SECRET;

// JWT STRATEGY ========================================
module.exports = passport.use('jwt',
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }
    catch (error) {
      console.log(error);
    }
  })
)

// GOOGLE STRATEGY =====================================
module.exports = passport.use('google',
  new GoogleStrategy({
    clientID: key.GOOGLE_CLIENT_ID,
    clientSecret: key.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/users/google/redirect'
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)

        let user = await User.findOne({ 'googleId': profile.id });
        if (user) {
          // console.log(user)
          return done(null, user);
        }
        else {
          user = new User({
            isOAuth: true,
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            userImg: profile.photos[0].value,
            // token: accessToken
          });
          await user.save();
          return done(null, user);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  ));