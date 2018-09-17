class Post < ApplicationRecord
  has_many :photos, as: :imageble
end
