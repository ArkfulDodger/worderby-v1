class AddChallengeeIdToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :challengee_id, :integer
  end
end
