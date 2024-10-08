const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env) => {
  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '',
      filename: '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        historyApiFallback: 'public/index/html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        configType: 'flat',
        extensions: ['js', 'ts', 'tsx'],
        failOnWarning: false,
        failOnError: false,
      }),
      new DotenvPlugin({
        path: './variables.env.all',
      }),
      new webpack.EnvironmentPlugin({
        BASE_URL: env.base_url || 'https://gatewayauth.azurewebsites.net',
      }),
    ],
  }
}
