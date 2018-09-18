class Family < ApplicationRecord
  has_one_attached :photo
  has_many :guests
  has_one :message
end
