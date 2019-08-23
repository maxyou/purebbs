const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM",
    // },
    // addition - add source-map support
    devtool: "source-map",
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: { loader: 'awesome-typescript-loader' }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            // {
            //     test: /\.js|jsx$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: [
                `/tool`,
                `/user`,
                `/admin`,
                `/extend`,
                `/sys`,
                `/avatar`,
                `/detail`,
                `/post`
            ],
            target: 'http://localhost:3001',
            secure: false,
            changeOrigin: true
        }]
    }
};
