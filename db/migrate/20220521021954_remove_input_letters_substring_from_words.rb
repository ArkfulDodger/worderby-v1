class RemoveInputLettersSubstringFromWords < ActiveRecord::Migration[7.0]
  def change
    remove_column :words, :input_letters_substring, :string
  end
end
