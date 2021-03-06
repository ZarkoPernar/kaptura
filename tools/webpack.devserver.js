const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CONFIG = require('./config')

module.exports = {
    devtool: 'source-map',
    entry: [
        // 'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://localhost:8080',
        // 'webpack/hot/only-dev-server',
        CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE,
    ],
    target: 'web',
    output: {
        path: path.resolve(process.cwd(), CONFIG.CLIENT_OUTPUT_PATH),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js'],
        // alias: {
        //     'react': 'preact-compat',
        //     'react-dom': 'preact-compat',
        //     'react-redux': 'preact-redux',
        // }
    },
    devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
    plugins: [
        new WebpackNotifierPlugin(),
        new HtmlWebpackPlugin(CONFIG.HtmlWebpackPlugin),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                BUILD_TARGET: JSON.stringify('src/web'),
            },
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(process.cwd(), CONFIG.CLIENT_OUTPUT_PATH),
        }),
    ],
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: 'cache',
                    },
                },
                include: [path.resolve('src/web')],
                exclude: ['.spec.'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader',
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff)$/i,
                use: ['file-loader', 'image-webpack-loader'],
            },
        ],
    },
}
