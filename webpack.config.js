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
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(jpg|jpeg|png|svg|gif|ico)$/,
          use: {
            loader: "file-loader",
            options: {
              publicPath: '/assets/images',
              outputPath: 'images',
            }
          }
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['public/assets/js'],
        cleanStaleWebpackAssets: false
      }),
      new MiniCssExtractPlugin({}),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: 'errors-only',
    ...development
  }
];