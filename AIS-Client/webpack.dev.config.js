const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack=require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
  },
  mode:'development',
  target:"web",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              // camelCase:"dashes",
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                autoprefixer({
                  browsers: [">1%", "last 2 versions"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]"
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  // devServer: {
  //   port: 3000,
  //   open: true,
  //   proxy: {
  //     "/main": "http://localhost:8080"
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname+"/src/index.html",
      filename: "index.html",
      inject: "body",
      excludeChunks: [ 'server' ]
    }),
    new Dotenv()
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          unused: false
        }
      }
    })]
  },
};
