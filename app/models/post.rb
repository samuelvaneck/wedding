class Post < ApplicationRecord
  has_one_attached :photo

  validates :comment, presence: true
end
