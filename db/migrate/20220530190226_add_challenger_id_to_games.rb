class AddChallengerIdToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :challenger_id, :integer
  end
end
