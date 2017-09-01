const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

import UserModel from '../models/user'

export default new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:5000/auth/google/callback'
    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            UserModel.findOne({ 'google.id': profile.id }, function(err, user) {
                if (err) return done(err)

                if (user) {
                    // if a user is found, log them in
                    return done(null, user)
                } else {
                    // TODO: change this, should not be default functionality
                    // if the user is not in our database, create a new user
                    var newUser          = new UserModel()

                    // set all of the relevant information
                    newUser.email = profile.emails[0].value
                    newUser.full_name  = profile.displayName

                    newUser.google.id    = profile.id
                    newUser.google.token = token
                    newUser.google.name  = profile.displayName
                    newUser.google.email = profile.emails[0].value // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }
)

