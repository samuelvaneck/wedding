class CreateFamilies < ActiveRecord::Migration[5.2]
  def change
    create_table :families do |t|
      t.string :email
      t.string :name
      t.boolean :response
      t.integer :attendees

      t.timestamps
    end
  end
end
