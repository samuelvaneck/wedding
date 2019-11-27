const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript'),
      '@images': path.resolve(__dirname, '..', '..', 'app/assets/images'),
      '@components': '@src/components',
      React: 'react',
      ReactDOM: 'react-dom'
    }
  }
};