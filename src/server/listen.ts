export default function initApp(app, http, { port }) {
    http.listen(port, listenCb)

    function listenCb(err: Error) {
        if (err) {
            console.error('error starting server:')
            console.error(err.stack)
            process.exit(1)
        }
        console.log('server listening at http://localhost:' + port)
    }
}
