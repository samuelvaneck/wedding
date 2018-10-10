require 'faker'

FactoryBot.define do
  factory :post do
    comment { Faker::GameOfThrones.quote }
  end
end