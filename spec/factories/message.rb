require 'faker'

FactoryBot.define do
  factory :message do
    content { Faker::Hipster.sentence }
  end
end
