class AddAttendingToGuest < ActiveRecord::Migration[5.2]
  def change
    add_column :guests, :attending, :boolean
    remove_column :families, :attendees, :boolean
  end
end
