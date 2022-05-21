class DropGamePrompts < ActiveRecord::Migration[7.0]
  def change
    drop_table :game_prompts
  end
end
