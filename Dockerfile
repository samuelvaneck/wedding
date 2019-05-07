FROM ruby:2.5.1

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn zip

ENV INSTALL_PATH /app
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install
COPY . $INSTALL_PATH
