const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path:'./public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{exclude: /node_modules/,loader: 'babel'},
    { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
        new ExtractTextPlugin('./style.css', {
            allChunks: true
        })
    ],
  devServer: {
    hot:true,
    historyApiFallback: true,
    contentBase: './'
  }
};