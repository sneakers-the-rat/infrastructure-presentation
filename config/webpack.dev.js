const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require( 'path' );

const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test:/\.(s[ac]ss)$/i,
        use: [
          'style-loader',
          // {
          //   loader: 'css-loader',
          //   options: { sourceMap: true },
          // },
          // { loader: 'sass-loader', options: { sourceMap: true } },
            'css-loader',
            'sass-loader'
        ],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
