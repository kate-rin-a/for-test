const path = require('path');

module.exports = {
    entry: './src/main-assync.js',
    output: {
      filename: 'main.bandle.js',
      path: path.resolve(__dirname, 'build/js')
    },
  };