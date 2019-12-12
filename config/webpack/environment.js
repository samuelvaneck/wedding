const { environment } = require('@rails/webpacker')
const customConfig = require('./custom')
const typescript =  require('./loaders/typescript')
const webpack = require('webpack');
const dotenv = require('dotenv');

const dotenvFiles = [
  '.env.' + process.env.NODE_ENV + '.local',
  '.env.local',
  '.env.' + process.env.NODE_ENV,
  '.env'
]
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  d3: 'd3',
}));

environment.config.set('resolve.alias', {jquery: 'jquery/src/jquery'});

environment.loaders.prepend('typescript', typescript)

// Merge custom config
environment.config.merge(customConfig);

module.exports = environment