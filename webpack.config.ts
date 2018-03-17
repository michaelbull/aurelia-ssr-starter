import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

const { AureliaPlugin } = require('aurelia-webpack-plugin');

let title = 'Aurelia SSR';
let baseUrl = '/';

let srcDir = path.resolve(__dirname, 'src');
let distDir = path.resolve(__dirname, 'dist');
let serverDir = path.resolve(distDir, 'server');
let staticDir = path.resolve(distDir, 'static');

function configure(env: 'client' | 'client-ssr' | 'server', args: any): webpack.Configuration {

    let config: webpack.Configuration = {
        output: {
            path: env === 'server' ? serverDir : staticDir,
            publicPath: baseUrl,
            filename: '[name].js',
            chunkFilename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.css$/,
                    use: (args.mode === 'production') ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    }) : ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]',
                            emitFile: env !== 'server'
                        }
                    }
                }
            ]
        },

        resolve: {
            extensions: [
                '.js',
                '.ts'
            ],
            modules: [
                'node_modules',
                srcDir
            ]
        },

        plugins: [
            new AureliaPlugin()
        ],

        devServer: {
            stats: 'errors-only',
            contentBase: distDir,
            historyApiFallback: true // serve index.html for all 404 (required for push-state)
        }
    };

    if (env === 'server') {
        config.target = 'node';
        config.output!.libraryTarget = 'commonjs2';

        config.entry = {
            server: path.resolve(srcDir, 'server-main')
        };

        config.node = {
            __dirname: true
        };

        config.externals = [
            nodeExternals({
                whitelist: [
                    // these things should be in the webpack bundle
                    // other node_modules need to be left out
                    /-loader|aurelia-(?!pal-nodejs|pal|polyfills|bootstrapper)/
                ]
            })
        ];
    }

    if (env === 'client-ssr' || env === 'client') {
        config.entry = {
            client: ['aurelia-bootstrapper']
        };

        config.plugins!.push(new HtmlWebpackPlugin({
            template: env === 'client-ssr' ? 'index.ssr.ejs' : 'index.ejs',
            filename: env === 'client-ssr' ? path.resolve(serverDir, 'index.html') : 'index.html',
            favicon: 'assets/favicon.ico',
            title,
            baseUrl
        }));

        config.plugins!.push(new CopyWebpackPlugin([
            {
                from: 'node_modules/preboot/__dist/preboot_browser.js',
                to: 'preboot_browser.js'
            }
        ]));
    }

    if (env === 'server' || env === 'client-ssr') {
        config.plugins!.push(new ExtractTextPlugin('[name]-[contenthash].css'));
    }

    if (args.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    if (args.mode === 'production') {
        if (env !== 'server') {
            config.output!.filename = '[name]-[hash].js';
            config.output!.chunkFilename = '[name]-[chunkhash].js';
        }
    }

    return config;
}

export default configure;