class GameSerializer < ActiveModel::Serializer
  attributes :id,
             :player1_score,
             :player2_score,
             :prompt,
             :is_accepted,
             :is_over,
             :num_rounds,
             :round,
             :turn,
             :is_single_player,
             :is_word_played_this_turn,
             :challenger_id,
             :challengee_id,
             :worderbyte,
             :restricted_endings,
             :streak

  belongs_to :player1
  belongs_to :player2
  has_many :words
end
