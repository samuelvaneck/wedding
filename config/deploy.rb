lock "~> 3.11.0"

set :application, "wedding"
set :repo_url, "git@github.com:samuelvaneck/wedding.git"

set :deploy_to, "/home/deploy/wedding"

set :passenger_restart_with_touch, false

append :linked_files, "config/database.yml", "config/secrets.yml"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "vendor/bundle", "public/system", "public/uploads"
