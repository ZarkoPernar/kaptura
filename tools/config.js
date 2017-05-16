module.exports = {
    APP_PATH: './src',
    SERVER_APP_PATH: './server',

    CLIENT_ENTRY_FILE: '/index.js',
    CLIENT_OUTPUT_PATH: 'public',

    HtmlWebpackPlugin: {
        title: 'React Boilerplate',
        template: './src/index.html',
    },

    WEBPACK_DEV_SERVER_CONFIG: {
        port: process.env.PORT || 8080,
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
            }
        },

        // IMPORTANT: this option must come after proxy settings for react-router to work on reload
        historyApiFallback: true,
    },
}
