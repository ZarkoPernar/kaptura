"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const index_1 = require("./index");
function emitCompanySocket(company_id, ignoreUser, { type, payload }) {
    const shouldIgnoreUser = Array.isArray(ignoreUser) ? uid => ignoreUser.includes(uid) : uid => uid === ignoreUser;
    if (init_1.companyClients.has(company_id)) {
        if (init_1.companyClients.get(company_id)) {
            init_1.companyClients
                .get(company_id)
                .forEach((socket_id, user_id) => {
                // this is the user that initiated the update
                // so we do not notify him
                if (shouldIgnoreUser(user_id))
                    return;
                index_1.io.sockets.connected[socket_id].emit(type, payload);
            });
        }
    }
}
exports.emitCompanySocket = emitCompanySocket;
