const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getEntries = dir => {
  const pagesDir = path.resolve(__dirname, dir);
  let entry = {};
  fs.readdirSync(pagesDir).forEach(file => {
    const fullpath = path.join(pagesDir, file, "entry.js");
    entry[file] = fullpath;
  });
  return entry;
};
const entries = getEntries("./src/pages");
const HtmlWebpackPlugins = Object.keys(entries).map(k => {
  return new HtmlWebpackPlugin({
    title: k,
    filename: `${k}.html`,
    template: "./template.html",
    chunks: ["common", k]
  });
});
module.exports = {
  mode: "development",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js" // string
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              ["transform-react-jsx", { pragma: "h" }],
              "transform-decorators-legacy",
              "transform-object-rest-spread",
              "transform-export-extensions",
              "syntax-dynamic-import",
              "transform-react-constant-elements"
            ]
          }
        }
      }
    ]
  },
  plugins: [...HtmlWebpackPlugins],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: "common",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    host: "0.0.0.0"
  }
};
