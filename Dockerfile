FROM ruby:3.0.3

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get --allow-releaseinfo-change update -qq && \
    apt-get install -y build-essential libpq-dev nodejs yarn zip libnss3-dev libffi-dev

# adding additional fonts and wkhtmltopdf
RUN apt-get update \
    && apt-get install -y \
        curl \
        libxrender1 \
        libjpeg62-turbo \
        fontconfig \
        libxtst6 \
        xfonts-75dpi \
        xfonts-base \
        xz-utils
RUN wget --no-check-certificate https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb
RUN dpkg -i /wkhtmltox_0.12.6-1.buster_amd64.deb
RUN rm /wkhtmltox_0.12.6-1.buster_amd64.deb

ENV INSTALL_PATH /app
ENV RAILS_ENV production
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . $INSTALL_PATH

RUN gem install bundler -v '~>2.2.28' --no-document --quiet --force
RUN bundle config set deployment 'true'
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle config set --local without 'development test'
RUN bundle install --jobs "$(nproc --all)" --retry 3
RUN bundle exec rails assets:precompile --jobs "$(nproc --all)"
RUN ./bin/webpack

CMD ["bundle", "exec", "rails s -p 3000 -b 0.0.0.0"]
