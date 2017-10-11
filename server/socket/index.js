"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require('socket.io');
const init_1 = require("./init");
const index_1 = require("../index");
exports.io = socketIo(index_1.http, { path: '/napi' });
init_1.default({ io: exports.io });
