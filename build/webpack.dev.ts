import * as webpack from "webpack";
import {DEV_PORT, DIST_DIR, joinDir} from "./webpack.env";

const dev: webpack.Configuration = {
    mode: "development",
    devtool: "eval-source-map",
    output: {
        path: joinDir(DIST_DIR, "dev"),
        devtoolModuleFilenameTemplate: (info: any) => {
            let $filename = 'sources://' + info.resourcePath;
            if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
                $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
            }
            return $filename;
        },
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },
    devServer: {
        static: false,
        compress: true,
        port: DEV_PORT,
    },
}

export default dev;