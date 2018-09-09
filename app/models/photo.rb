class Photo < ApplicationRecord
  belongs_to :imageble, polymorphic: true
end
