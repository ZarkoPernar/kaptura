let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let WebpackNotifierPlugin = require('webpack-notifier')

let CONFIG = require('./config')

module.exports = {
    devtool: 'source-map',
    entry: [
        CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE
    ],
    target: 'web',
    output: {
        path: path.resolve(CONFIG.CLIENT_OUTPUT_PATH),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new WebpackNotifierPlugin(),
        new HtmlWebpackPlugin(CONFIG.HtmlWebpackPlugin),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("src/web")
            }
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    performance: {
        hints: false
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: 'cache',
                    }
                },
                include: [
                    path.resolve('src/web'),
                ],
                exclude: ['.spec.'],
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader',
                    'image-webpack-loader'
                ]
            },
        ]
    }
}
