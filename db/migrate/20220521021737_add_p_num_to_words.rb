class AddPNumToWords < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :p_num, :integer
  end
end
