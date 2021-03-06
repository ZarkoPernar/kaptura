const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const MinifyPlugin = require('babel-minify-webpack-plugin')

const CONFIG = require('./config')

module.exports = function(env) {
    return {
        mode: 'production',
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: 'cheap-module-source-map',
        entry: {
            app: CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE,
            // vendor: ['react',], // reselect, recompose, others...
        },
        output: {
            path: path.resolve(process.cwd(), CONFIG.CLIENT_OUTPUT_PATH),
            chunkFilename: '[name].bundle-[chunkhash].js',
            filename: 'bundle-[chunkhash].js',
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
        stats: {
            reasons: true,
        },
        devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                // 'process.env.BABEL_ENV': JSON.stringify('production'),
            }),

            // new HtmlWebpackPlugin(
            //     Object.assign({}, CONFIG.HtmlWebpackPlugin, {
            //         minify: {
            //             removeComments: true,
            //             collapseWhitespace: true,
            //             removeRedundantAttributes: true,
            //             useShortDoctype: true,
            //             removeEmptyAttributes: true,
            //             // removeStyleLinkTypeAttributes: true,
            //             keepClosingSlash: true,
            //             minifyJS: true,
            //             minifyCSS: true,
            //             minifyURLs: true,
            //         },
            //         inject: true,
            //     }),
            // ),

            // new ExtractTextPlugin('styles.[chunkhash].css'),

            // eradicates unused locales
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),

            // new SWPrecacheWebpackPlugin({
            //     cacheId: 'kaptura-v1',
            //     filename: 'service-worker.js',
            //     maximumFileSizeToCacheInBytes: 4194304,
            //     minify: true,
            //     staticFileGlobs: [
            //         'public/**/*.css',
            //         'public/**/*.js',
            //         'public/**/*.html',
            //     ],
            //     stripPrefix: 'public/',
            // }),

            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     // filename: 'commons-[chunkhash].js',

            //     // create a additional async chunk for the common modules
            //     // which is loaded in parallel to the requested chunks
            //     async: true,

            //     minChunks: function(module) {
            //         // this assumes your vendor imports exist in the node_modules directory
            //         return (
            //             module.context &&
            //             module.context.indexOf('node_modules') !== -1
            //         )
            //     },
            // }),

            new CopyWebpackPlugin([
                {
                    from: 'src/web/manifest.json',
                    to: '',
                },
                {
                    from: 'resources/favicon.ico',
                    to: '',
                },
                {
                    context: 'resources',
                    from: '*.png',
                },
            ]),

            // TODO: works but generated manifest needs config
            // new FaviconsWebpackPlugin('./resources/logo.png'),

            // new BundleAnalyzerPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    include: [path.resolve('src/web')],
                    exclude: ['.spec.'],
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },

                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            query: {
                                progressive: true,
                                optimizationLevel: 7,
                                interlaced: false,
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4,
                                },
                            },
                        },
                    ],
                },
            ],
        },
    }
}
