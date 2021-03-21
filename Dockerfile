FROM ruby:3.0.0

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn zip libnss3-dev

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
RUN gem update --system && \
    gem install bundler && \
    bundle update rake && \
    yarn install --check-files && \
    bundle config build.nokogiri --use-system-libraries && \
    bundle config git.allow_insecure true && \
    bundle config set deployment 'true' && \
    bundle config set frozen 'true' && \
    bundle config set without 'development test' && \
    bundle install --quiet && \
    bundle exec rake assets:precompile

CMD ["bundle", "exec", "rails s -p 3000 -b 0.0.0.0"]
