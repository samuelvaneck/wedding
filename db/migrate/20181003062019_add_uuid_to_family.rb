class AddUuidToFamily < ActiveRecord::Migration[5.2]
  def change
    add_column :families, :uuid, :string

    Family.all.each do |f|
      f.uuid = SecureRandom.hex 3
      f.save
    end
  end
end
