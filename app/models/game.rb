class Game < ApplicationRecord
  has_many :words
  belongs_to :player1, class_name: 'User', foreign_key: 'player1_id'
  bolongs_to :player2, class_name: 'User', foreign_key: 'player2_id'
end
