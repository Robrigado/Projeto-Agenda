const path = require('path'); 
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './frontend/main.js',
  plugins: [new miniCssExtractPlugin()],
  output: {
      path: path.resolve(__dirname, 'public', 'assets', 'js'),
      filename: 'bundle.js'
  },
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env']
            }
        }
      },
      {
          test:/\.css$/,
          use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg'
        }
      },
    ]
  },
};