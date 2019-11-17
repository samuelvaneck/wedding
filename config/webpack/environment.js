const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')
const webpack = require('webpack');

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  d3: 'd3',
}));

environment.config.set('resolve.alias', {jquery: 'jquery/src/jquery'});

environment.loaders.prepend('typescript', typescript)
module.exports = environment
