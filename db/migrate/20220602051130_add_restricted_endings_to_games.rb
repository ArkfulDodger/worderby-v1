class AddRestrictedEndingsToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :restricted_endings, :string, array: true, default: []
  end
end
