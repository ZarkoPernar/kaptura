"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initApp(app, http, { port }) {
    http.listen(port, listenCb);
    function listenCb(err) {
        if (err) {
            console.error('error starting server:');
            console.error(err.stack);
            process.exit(1);
        }
        console.log('server listening at http://localhost:' + port);
    }
}
exports.default = initApp;
