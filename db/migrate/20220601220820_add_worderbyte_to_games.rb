class AddWorderbyteToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :worderbyte, :string
  end
end
