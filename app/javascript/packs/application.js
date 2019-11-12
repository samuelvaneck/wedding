/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
import * as d3 from "d3";
import('bootstrap')
import('popper.js')
import percentageChart from 'packs/admin/donut_percentage'
import getUrlParameter from 'packs/admin/get_params'
import RSVP from 'packs/application/rsvp'
import handleClickRSVPReset from 'packs/application/rsvp_reset'
import openNav from 'packs/admin/menu'
import closeNav from 'packs/admin/menu'
import handleKeyUpSearch from 'packs/application/search'
window.RSVP = RSVP

console.log('Hello World from Webpacker')
require('@rails/ujs').start()
require('@rails/activestorage').start()
require('turbolinks').start()