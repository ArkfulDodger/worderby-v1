class RemovePromptIdFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :prompt_id, :integer
  end
end
