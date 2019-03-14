require 'faker'

FactoryBot.define do
  factory :guest do
    name { Faker::TvShows::Friends.character }
    day_guest { Faker::Boolean.boolean }
    attending { Faker::Boolean.boolean }
  end
end
