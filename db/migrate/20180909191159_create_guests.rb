class CreateGuests < ActiveRecord::Migration[5.2]
  def change
    create_table :guests do |t|
      t.string :name
      t.boolean :day_guest
      t.references :family, foreign_key: true

      t.timestamps
    end
  end
end
