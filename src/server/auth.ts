const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

import googleAuthStrategy from './config/googleStrategy'

import UserModel from './models/user'

export default function registerAuthStrategies(app) {
    passport.use(new LocalStrategy(UserModel.authenticate()))

    passport.use(googleAuthStrategy)

    passport.serializeUser(UserModel.serializeUser())
    passport.deserializeUser(UserModel.deserializeUser())
}
