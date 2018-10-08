require 'faker'

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "UserPassword01" }
  end
end
