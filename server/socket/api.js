"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const index_1 = require("./index");
function emitCompanySocket(company_id, { type, payload, room }, ignoreUser) {
    const companySocketNS = index_1.io.of(`/company/${company_id}`);
    const socketId = init_1.companyClients.get(ignoreUser);
    const companySocketForUser = companySocketNS.connected[socketId];
    if (ignoreUser !== undefined && companySocketForUser !== undefined) {
        return companySocketNS.broadcast.emit(type, payload);
    }
    return companySocketNS.emit(type, payload);
}
exports.emitCompanySocket = emitCompanySocket;
