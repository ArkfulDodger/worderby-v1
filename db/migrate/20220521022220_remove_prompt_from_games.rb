class RemovePromptFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :prompt, :string
  end
end
