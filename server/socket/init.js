"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs");
const Observable_1 = require("rxjs/Observable");
exports.userClients = new Map(); // { [user_id]: socket_id }
exports.companyClients = new Map(); // { [user_id]: socket_id } for company NS
const mapKeysToHash = map => {
    const hash = {};
    map.forEach((_, key) => {
        hash[key] = true;
    });
    return hash;
};
function initSocket({ io }) {
    io.on('connection', function (mainSocket) {
        let _user;
        Observable_1.Observable.fromEvent(mainSocket, 'add user')
            .subscribe((user) => {
            const companyNS = io.of('/company/' + user.company_id);
            _user = user;
            exports.userClients.set(user._id, mainSocket.id);
            companyNS.once('connection', companySocket => {
                console.log('connection');
                companySocket.broadcast.emit('user connected', user.full_name);
                exports.companyClients.set(user._id, companySocket.id);
                companyNS.emit('online_users', mapKeysToHash(exports.companyClients));
            });
            // finally we send the newly connected user
            // the full company roster of connected users
            // TODO: use .clints(ids[])
            // const hash = {}
            // companyClients.get(user.company_id).forEach((_, user_id) => {
            //     hash[user_id] = true
            // })
            // emitCompanySocket(user.company_id, {
            //     type: 'online_users',
            //     payload: hash,
            // })
        });
        mainSocket.on('disconnect', function () {
            if (!_user)
                return;
            const companyNS = io.of('/company/' + _user.company_id);
            exports.userClients.delete(_user._id);
            exports.companyClients.get(_user._id);
            companyNS.emit('online_users', mapKeysToHash(exports.companyClients));
        });
    });
}
exports.default = initSocket;
