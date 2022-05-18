class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :player1_id
      t.integer :player2_id
      t.boolean :is_over
      t.integer :num_rounds
      t.integer :round
      t.integer :turn
      t.string :prompt
      t.integer :player1_score
      t.integer :player2_score
      t.boolean :is_single_player

      t.timestamps
    end
  end
end
