class Photo < ApplicationRecord
  belongs_to :imageble, polymorphic: true
  belongs_to :family, optional: true

  def store photo_io
    File.open(Rails.root.join("public", "uploads", photo_io.original_filename), "wb") do |file|
      file.write photo_io.read
    end
  end
end
