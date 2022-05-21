class AddIsFirstWordToWords < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :is_first_word, :boolean
  end
end
