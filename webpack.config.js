const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpack = require('webpack');

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve('@babel/preset-react')]
  }
};

module.exports = {
  mode: "development",
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'main.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [babelLoader],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.md$/,
        use: [require.resolve('raw-loader')]
      },
      {
        test: /\.mdx$/,
        use: [babelLoader, 'spectacle-mdx-loader']
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: [require.resolve('file-loader')]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, 'public/index.html' ),
      title: "Hey what up"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  resolve: {
    alias: {
      // Add helper aliases needed when `yarn link spectacle` development
      // is enabled to avoid duplicate libs that require singletons.
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom')
    }
  }
};
