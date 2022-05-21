class AddPromptIdToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :prompt_id, :integer
  end
end
