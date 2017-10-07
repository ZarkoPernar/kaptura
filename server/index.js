"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get environment variables
// ==============================================
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
exports.http = require('http').Server(app);
const middleware_1 = require("./middleware");
require("./socket");
const listen_1 = require("./listen");
const db_1 = require("./db");
const routes_1 = require("./routes");
const auth_1 = require("./auth");
// INIT App
// ==============================================
// Start server
// ==============================================
listen_1.default(app, exports.http, { port: PORT });
// Connect MongoDB
// ==============================================
db_1.default(MONGO_URL);
// Init express session, mongo session, logging etc.
// ==============================================
middleware_1.default(app);
// Init auth strategies LocalStrategy, googleAuthStrategy
// ==============================================
auth_1.default(app);
// Init all routes
// ==============================================
routes_1.default(app);
