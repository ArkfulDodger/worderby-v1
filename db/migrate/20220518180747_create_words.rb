class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.integer :game_id
      t.integer :round_played
      t.integer :turn_played
      t.integer :user_id
      t.string :text
      t.string :prompt_text
      t.string :prompt_letters_substring
      t.string :input_letters_substring
      t.integer :total_score

      t.timestamps
    end
  end
end
