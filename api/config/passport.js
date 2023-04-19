const passport=require('passport');
const UserModel=require('../models/User');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;



let authenticateLogin = async (email, password, cb) => {
    UserModel.findOne({email})
    .then(async (user) => {
        if (!user) {
            return cb(null, false);
        }

        const isValidPwd = await user.isValidPassword(password);

        if (isValidPwd) {
           
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    })
    .catch((err) => {
        // This is an actual application error; something has gone wrong
        cb(err);
    });
};
// Define a function that extracts a user ID from a given token
let getUserFromToken = async (token, cb) => {
    try {
        return cb(null, token.payload);
    } catch(err) {
        cb(err);
    }
}

passport.use(
    // This is the nickname that allows us to invoke this passport functionality
    'login',
    // Create a new local Strategy to interact with our database
    new localStrategy(
      // Passport expects fields named "username" and "password"
      // We are using "email" instead of username, so we have to provide an object that has our field names in it
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      // Use our defined function that processes the email and password to find a user
      authenticateLogin
      )    
);

// 3 - JWT strategy for reading a token and providing access to a resource
passport.use(
    new JWTstrategy(
        // Passport retrieves the token from the request header and uses the secret key in the .env file to determine which user sent the request
        // It then calls a function that extracts a user object and returns it (getUserFromToken)
        {
            secretOrKey: process.env.TOP_SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        // Use our helper function that returns the user object based on the token
        getUserFromToken
    )
)