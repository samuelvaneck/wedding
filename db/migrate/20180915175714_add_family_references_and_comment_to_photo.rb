class AddFamilyReferencesAndCommentToPhoto < ActiveRecord::Migration[5.2]
  def change
    add_reference :photos, :family, foreign_key: true
    add_column :photos, :comment, :text
  end
end
