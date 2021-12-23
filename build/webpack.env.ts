import * as path from "path";
import {WebpackError} from "webpack";


export const joinDir = (...paths: string[]) => path.join(...paths);
export const resolveDir = (...paths: string[]) => path.resolve(...paths);
export const PROJECT_DIR = resolveDir(__dirname, "..");
export const SRC_DIR = joinDir(PROJECT_DIR, "src");
export const DIST_DIR = joinDir(PROJECT_DIR, "dist");
export const NODE_MODULES_DIR = joinDir(PROJECT_DIR, "node_modules");

export const PAGES_DIR = joinDir(SRC_DIR, "pages");
export const DEV_PORT = 9000;



export const useLoader = (loaders: string[] | string, ...paths: string[]) => {
    let loader: string;
    if (Array.isArray(loaders)) {
        loader = loaders.join("!");
    } else if (typeof loaders === "string") {
        loader = loaders;
    } else {
        throw new WebpackError("loaders argument must be string | string[]");
    }
    return `!!${loader}!${joinDir(...paths)}`;
}