const { environment } = require('@rails/webpacker')
const customConfig = require('./custom')
const typescript =  require('./loaders/typescript')
const webpack = require('webpack');
// const fileLoader = require('./loaders/file');

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  d3: 'd3',
}));

environment.config.set('resolve.alias', {jquery: 'jquery/src/jquery'});

environment.loaders.prepend('typescript', typescript)
// environment.loaders.append('file', fileLoader)

// Merge custom config
environment.config.merge(customConfig);

module.exports = environment
