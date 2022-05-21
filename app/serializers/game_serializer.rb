class GameSerializer < ActiveModel::Serializer
  attributes :id,
             :player1_id,
             :player2_id,
             :is_over,
             :num_rounds,
             :round,
             :turn,
             :player1_score,
             :player2_score,
             :is_single_player
end
