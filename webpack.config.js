const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('1091079-big-trip-14', 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('1091079-big-trip-14', 'public'),
    watchContentBase: true,
  }
};
