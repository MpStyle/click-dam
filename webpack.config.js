const CleanWebpackPlugin = require('clean-webpack-plugin')

const tslint = {
    test: /\.ts(x?)$/,
    enforce: 'pre',
    use: [
        {
            loader: 'tslint-loader',
            // options: { }
        }
    ]
}

const tsloader = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'ts-loader'
        }
    ]
}

const output = {
    filename: '[name].js',
    path: __dirname + "/dist/js"
}

const clean = new CleanWebpackPlugin([
    'dist/js/*.js', 'dist/js/*.js.map'
])

const main = {
    name: 'main',
    target: "electron-main",
    mode: "production",
    entry: {
        main: ["./src/main/ts/clickdam/main.ts"]
    },
    output: output,
    cache: true,
    plugins: [
        clean
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', ".ts", ".js"]
    },
    devtool: 'source-map',
    module: {
        rules: [
            tslint,
            tsloader
        ]
    }
}

const renderer = {
    name: 'renderer',
    target: "electron-renderer",
    mode: "production",
    entry: {
        index: ["./src/main/ts/clickdam/index.tsx"]
    },
    output: output,
    cache: true,
    plugins: [
        clean
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', ".ts", ".tsx", ".js"]
    },
    devtool: 'source-map',
    module: {
        rules: [
            tslint,
            tsloader,
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    }
}

module.exports = [main, renderer];