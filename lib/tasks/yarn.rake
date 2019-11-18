# frozen_string_literal: true

namespace :yarn do
  desc 'Install all JavaScript dependencies as specified via Yarn'
  task :install do
    puts 'Ignoring yarn install failure'

    begin
      system './bin/yarn install --no-progress --ignore-optional; true'
    rescue
      exit(true)
    end

    exit(true)
  end
end

task(:default).clear.enhance(['yarn:install'])

# Run Yarn prior to Sprockets assets precompilation, so dependencies are available for use.
if Rake::Task.task_defined?('assets:precompile')
  Rake::Task['assets:precompile'].enhance [ 'yarn:install' ]
end