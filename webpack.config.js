let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let path = require('path');

module.exports = (env, argv) => {
    return {
        mode: argv.mode == 'development' ? 'development' : 'production',
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: "index.bundle.js",
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: '/node_modules',
                    use: {
                        loader: "babel-loader",
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
    }
}