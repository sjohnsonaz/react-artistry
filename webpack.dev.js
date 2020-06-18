const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'main': './examples/scripts/main.ts',
        'styles': './examples/styles/style.styl'
    },
    output: {
        filename: '[name]-[hash:6].js',
        path: path.resolve(__dirname, './bundle')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader']
        }, {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'clean-css-loader',
                { loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        }, {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'examples/html/index.html'
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true
    },
    stats: {
        warningsFilter: [/Failed to parse source map/],
    }
};
