module.exports = {
    APP_PATH: './src/web',
    SERVER_APP_PATH: './src/server',

    CLIENT_ENTRY_FILE: '/index.js',
    CLIENT_OUTPUT_PATH: 'public',

    HtmlWebpackPlugin: {
        title: 'React Boilerplate',
        template: './src/web/index.html',
    },

    WEBPACK_DEV_SERVER_CONFIG: {
        port: process.env.LIVE_PORT || 8080,
        host: 'localhost',
        stats: 'errors-only',
        overlay: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },

        hot: true,

        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            },
            '/auth': {
                target: 'http://localhost:5000'
            },
            '/napi/*': {
                target: 'ws://localhost:5000',
                ws: true,
            },
        },

        // IMPORTANT: this option must come after proxy settings for react-router to work on reload
        historyApiFallback: true,
    },
}
