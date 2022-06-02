class AddTimePenaltyToWord < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :time_penalty, :integer
  end
end
