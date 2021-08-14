const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const development = process.env.NODE_ENV !== 'production' ? { devtool: "source-map" } : {};

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: {
      client: "./src/client.ts"
    },
    output: {
      path: path.resolve(__dirname, './public/assets'),
      filename: "js/[name].js",
      assetModuleFilename: 'images/[hash][ext][query]'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              caller: { target: 'web' },
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                url: true,
                importLoaders: 2,
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(jpg|jpeg|png|svg|gif|ico)$/,
          type: "asset/resource",
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['public/assets/js'],
        cleanStaleWebpackAssets: false
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: 'errors-only',
    ...development
  }
];