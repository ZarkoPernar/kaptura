"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const connectMongodbSession = require('connect-mongodb-session');
const MongoDBStore = connectMongodbSession(expressSession);
function initMiddleware(app) {
    app.use(logger('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    if (process.env.NODE_ENV.trim() === 'development') {
        app.use(expressSession({
            store: new MongoDBStore({
                uri: process.env.MONGO_URL,
                collection: 'mySessions'
            }),
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        }));
    }
    else {
        app.use(expressSession({
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        }));
    }
    app.use(passport.initialize());
    app.use(passport.session());
}
exports.default = initMiddleware;
