var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  devServer: {
    port: 4200,
    open: true
  },
  optimization: {
    minimize: false
  }
};