const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: 'public/favicon.ico',
        }),
        new Dotenv(),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@hooks": path.resolve(__dirname, "src/hooks/"),
            "@routes": path.resolve(__dirname, "src/routes/"),
            "@assets": path.resolve(__dirname, "src/assets/"),
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@services": path.resolve(__dirname, "src/services/"),
            "@views": path.resolve(__dirname, "src/views/"),
            "@layout": path.resolve(__dirname, "src/layout/"),
            "@ui-component": path.resolve(__dirname, "src/ui-component/"),
            "@themes": path.resolve(__dirname, "src/themes/"),
            "@store": path.resolve(__dirname, "src/store"),
            "@reducers": path.resolve(__dirname, "src/reducers"),
            "@api": path.resolve(__dirname, "src/api/"),
            "@config": path.resolve(__dirname, "src/config"),
            "@context": path.resolve(__dirname, "src/context"),
            "@menu-items": path.resolve(__dirname, "src/menu-items"),
            "@modules": path.resolve(__dirname, "src/modules"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                type: "asset",
            },
            {
                test: /\.(woff2|woff|eot|ttf)$/,
                type: "asset",

            },
        ],
    },
    devServer: {
        historyApiFallback: {
            disableDotRule: true,
        },
        headers: {
            'Content-Language': 'es' // Cambia 'es' por el código del idioma que prefieras
        },
        allowedHosts: [
            'sandbox.generali.com.ec',
            'webapp.generali.com.ec',
            'api.ipify.org',
            'devapp.generali.com.ec',
            'formularios.generali.com.ec',
            'formularios.generali.com.ec',
        ],
    }
};
