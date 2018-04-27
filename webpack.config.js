var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:'production',
    entry: {
        'ReactArtistry': './src/scripts/modules/ReactArtistry.ts'
    },
    output: {
        filename: './dist/bundle/[name].min.js',
        libraryTarget: 'var',
        library: '[name]'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader']
        }, {
            test: /\.styl$/,
            //loader: "style-loader!css-loader!clean-css-loader!postcss-loader!less-loader",
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                //{ loader: 'postcss-loader', options: { sourceMap: true } },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'clean-css-loader',
                //{ loader: 'postcss-loader', options: { sourceMap: true } }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
