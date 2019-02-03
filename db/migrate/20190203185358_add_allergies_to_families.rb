class AddAllergiesToFamilies < ActiveRecord::Migration[5.2]
  def change
    add_column :families, :allergies, :text
  end
end
