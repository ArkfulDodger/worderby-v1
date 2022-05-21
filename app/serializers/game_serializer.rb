class GameSerializer < ActiveModel::Serializer
  attributes :id,
             :player1_score,
             :player2_score,
             :prompt,
             :is_over,
             :num_rounds,
             :round,
             :turn,
             :is_single_player

  belongs_to :player1
  belongs_to :player2
  has_many :words
end
