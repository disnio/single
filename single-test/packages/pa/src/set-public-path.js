import { setPublicPath } from "systemjs-webpack-interop";
// 为了让sing-spa知道这是app1的应用
const appName = process.env.APP_NAME || ''

setPublicPath(appName)