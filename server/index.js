"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get environment variables
// ==============================================
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const express = require("express");
const middleware_1 = require("./middleware");
const listen_1 = require("./listen");
const socket_1 = require("./socket");
const db_1 = require("./db");
const routes_1 = require("./routes");
const auth_1 = require("./auth");
// INIT App
// ==============================================
const app = express();
const http = require('http').Server(app);
exports.io = require('socket.io')(http);
// Start server
// ==============================================
listen_1.default(app, http, { port: PORT });
// Start socket
// ==============================================
socket_1.default({ io: exports.io });
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
