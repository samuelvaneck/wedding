class Guest < ApplicationRecord
  belongs_to :family

  validates :name, presence: true

  scope :is_attending, -> { where(attending: true) }
  scope :day_guests_attending, -> { where(day_guest: true, attending: true) }
  scope :evening_guests_attending, -> { where(day_guest: false, attending: true) }
  scope :day_guests_not_attending, -> { where(day_guest: true, attending: false).or(Guest.where(day_guest: true, attending: nil)) }
  scope :evening_guests_not_attending, -> { where(day_guest: false, attending: false).or(Guest.where(day_guest: false, attending: nil)) }
  scope :not_attending, -> { where(attending: false).or(Guest.where(attending: nil)) }
end
