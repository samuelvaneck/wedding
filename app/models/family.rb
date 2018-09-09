class Family < ApplicationRecord
  has_one :photo, as: :imageble
end
