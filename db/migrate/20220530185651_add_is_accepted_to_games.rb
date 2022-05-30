class AddIsAcceptedToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :is_accepted, :boolean
  end
end
