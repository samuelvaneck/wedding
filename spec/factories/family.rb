require 'faker'

FactoryBot.define do
  factory :family do
    email { Faker::Internet.email }
    name { Faker::Name.name }
    response { Faker::Boolean.boolean }
    uuid { SecureRandom.hex 3 }
  end
  trait :with_guests do
    guests { build_list :guest, 2 }
  end
  trait :with_guests_and_message do
    guests { build_list :guest, 2}
    message { build :message }
  end
end
