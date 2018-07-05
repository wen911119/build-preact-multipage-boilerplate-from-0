const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    home: "./pages/home/entry.js",
    user: "./pages/user/entry.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js" // string
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
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
  plugins: [
    new HtmlWebpackPlugin({
      title: "home",
      filename: "home.html",
      template: "./template.html",
      chunks: ["common", "home"]
    }),
    new HtmlWebpackPlugin({
      title: "user",
      filename: "user.html",
      template: "./template.html",
      chunks: ["common", "user"]
    })
  ],
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
