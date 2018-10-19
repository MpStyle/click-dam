const main = {
    target: "electron-main",
    mode: "production",
    entry: {
        main: ["./src/main/ts/clickdam/main.ts"]
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/../dist/js"
    },
    cache: true,
    plugins: [
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', ".ts", ".js"]
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader'
                }
            ]
        }]
    }
}

const renderer = {
    target: "electron-renderer",
    mode: "production",
    entry: {
        index: ["./src/main/ts/clickdam/index.tsx"]
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/../dist/js"
    },
    cache: true,
    plugins: [
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', ".ts", ".tsx", ".js"]
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader'
                }
            ]
        }]
    }
}

module.exports = {
    default: [main, renderer]
};