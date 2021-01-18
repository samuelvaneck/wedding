FROM ruby:2.7.1

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn zip libnss3-dev

ENV INSTALL_PATH /app
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . $INSTALL_PATH
ENV BUNDLER_VERSION 2.1.4
RUN gem install bundler && \
    yarn install --check-files && \
    bundle config build.nokogiri --use-system-libraries && \
    bundle config git.allow_insecure true && \
    bundle config set deployment 'true' && \
    bundle config set frozen 'true' && \
    bundle config set without 'development test' && \
    bundle install --quiet && \
    bundle exec rake assets:precompile && \
    mkdir tmp/pids && \
    rm -rf vendor/cache/*.gem

CMD ["bundle", "exec", "rails s -p 3000 -b 0.0.0.0"]
