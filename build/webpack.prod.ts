import * as webpack from "webpack";
import {DIST_DIR, joinDir} from "./webpack.env";

const prod: webpack.Configuration = {
    mode: "production",
    output: {
        path: joinDir(DIST_DIR,"prod"),
        filename: "[name]-[contenthash].js"
    },
}

export default prod;