const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webAppConfig = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sw\.js$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: 'statics',
        to: './',
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: false,
    proxy: {
      '/api': {
        target: 'https://brainfix.herokuapp.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};

module.exports = [webAppConfig];
