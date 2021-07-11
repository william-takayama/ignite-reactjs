const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const environment = process.env.NODE_ENV;

module.exports = {
  mode: environment,
  // analysis code through browser devtool
  devtool: environment === "development" ? "eval-source-map" : "source-map",
  // __dirname = current diretory from this file (webpack.config.js)
  entry: ["babel-polyfill", path.resolve(__dirname, "src", "index.tsx")],
  // where you want to generate your file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // define which file extensions you can handle
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // watch for changes - run yarn webpack serve
  devServer: {
    contentBase: path.resolve(__dirname, "public", "index.html"),
    hot: true,
  },
  // how to handle each module using different
  // loaders for each file extension
  module: {
    rules: [
      {
        // regular expression
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              environment === "development" &&
                require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    // inject on your HTML the bundle.js script
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    // this is a hack to filter only true values from array
    environment === "development" && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
