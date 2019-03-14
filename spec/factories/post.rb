require 'faker'

FactoryBot.define do
  factory :post do
    comment { Faker::TvShows::GameOfThrones.quote }
  end
end