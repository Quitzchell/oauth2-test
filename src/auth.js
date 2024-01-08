const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: "http://localhost:8080/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

passport.serializeUser(function (user, done) {
    return done(null, user);
})

passport.deserializeUser(function (user, done) {
    return done(null, user);
})