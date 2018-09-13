class Family < ApplicationRecord
  has_one :photo, as: :imageble
  has_many :guests
  has_one :message
end
