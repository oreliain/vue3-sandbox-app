import * as webpack from "webpack";
import {VueLoaderPlugin} from "vue-loader";
import {SRC_DIR, joinDir, useLoader, PAGES_DIR} from "./webpack.env";
import {merge} from "webpack-merge";
import prod from "./webpack.prod";
import dev from "./webpack.dev";
import {WebpackError} from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
    entry: {
        app: [joinDir(SRC_DIR, "main.ts"), joinDir(SRC_DIR, "assets", "theme", "main.scss")],
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    reactivityTransform: true
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /assets\/theme\/.*\.scss$/,
            },
            {
                test: /assets\/theme\/.*\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    resolve: {
        extensions: [".vue", ".ts", ".js"],
        alias: {
            "composables": joinDir(SRC_DIR, "composables"),
            "components": joinDir(SRC_DIR, "components"),
            "pages": PAGES_DIR,
            "services": joinDir(SRC_DIR, "services"),
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: useLoader("handlebars-loader", SRC_DIR, "templates", "index.hbs"),
            title: 'Vue 3 sandbox app'
        }),
        new MiniCssExtractPlugin({
            filename: "theme.css"
        })
    ]
}

export default function webpackConfig(env: Record<string, unknown>) {
    if (env.production) {
        return merge(config, prod);
    } else if (env.development) {
        return merge(config, dev);
    } else {
        throw new WebpackError("No build mode specified")
    }
};