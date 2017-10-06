"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs");
const Observable_1 = require("rxjs/Observable");
exports.userClients = new Map();
exports.companyClients = new Map();
function initSocket({ io }) {
    io.on('connection', function (socket) {
        let _user;
        Observable_1.Observable.fromEvent(socket, 'add user')
            .subscribe((user) => {
            _user = user;
            if (exports.userClients.has(user._id))
                return;
            exports.userClients.set(user._id, socket.id);
            if (exports.companyClients.has(user.company_id)) {
                const company = exports.companyClients.get(user.company_id);
                if (!company.has(user._id)) {
                    company.set(user._id, socket.id);
                }
            }
            else {
                const map = new Map();
                map.set(user._id, socket.id);
                exports.companyClients.set(user.company_id, map);
                console.log(exports.companyClients.has(user.company_id));
            }
        });
        socket.on('disconnect', function () {
            if (!_user)
                return;
            exports.userClients.delete(_user._id);
            exports.companyClients.get(_user.company_id).delete(_user._id);
        });
    });
}
exports.default = initSocket;
