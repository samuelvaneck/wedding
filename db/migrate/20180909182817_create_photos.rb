class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :url
      t.integer :imagable_id
      t.string :imageble_type
      t.timestamps
    end

    add_index :photos, [:imageble_type, :imagable_id]
  end
end
