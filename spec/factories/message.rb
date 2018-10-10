require 'faker'

FactoryBot.define do
  factory :message do
    content { Faker::FamousLastWords.last_words }
  end
end
