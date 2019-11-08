source 'https://rubygems.org'
git_source(:github)  { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

gem 'rails', '~> 6.0'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'mini_racer', platforms: :ruby

gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'redis', '~> 4.0'
gem 'sidekiq'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bootstrap'
gem 'jquery-rails'
gem 'font-awesome-sass'
gem "roo"
gem 'devise'

gem 'capistrano'
gem 'capistrano-bundler'
gem 'capistrano-passenger'
gem 'capistrano-rails'
gem 'capistrano-rbenv'

gem 'rqrcode'
gem 'will_paginate'
gem 'wicked_pdf'
gem 'wkhtmltopdf-binary'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'launchy'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 4.0.0.beta3'
  gem 'shoulda-matchers'
end

group :development do
  gem 'brakeman'
  gem 'guard-rspec'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
