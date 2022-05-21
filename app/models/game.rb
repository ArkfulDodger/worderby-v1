class Game < ApplicationRecord
  has_many :words
  has_one :game_prompt
  has_one :prompt,
          through: :game_prompt,
          class_name: 'Word',
          foreign_key: 'word_id'
  belongs_to :player1, class_name: 'User', foreign_key: 'player1_id'
  belongs_to :player2, class_name: 'User', foreign_key: 'player2_id'
end
