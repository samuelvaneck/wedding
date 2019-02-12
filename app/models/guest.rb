class Guest < ApplicationRecord
  belongs_to :family

  validates :name, presence: true

  scope :is_attending, -> { where(attending: true) }
  scope :not_attending, -> { where(attending: false).or(Guest.where(attending: nil)) }
end
