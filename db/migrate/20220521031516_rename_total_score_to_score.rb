class RenameTotalScoreToScore < ActiveRecord::Migration[7.0]
  def change
    rename_column :words, :total_score, :score
  end
end
