const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path based on your project

// Configure the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Tell Passport to use 'email' instead of 'username'
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'Incorrect email.' });

            const isMatch = await user.comparePassword(password); // Ensure you have a password comparison method
            if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
