class RemovePromptLettersSubstringFromWords < ActiveRecord::Migration[7.0]
  def change
    remove_column :words, :prompt_letters_substring, :string
  end
end
