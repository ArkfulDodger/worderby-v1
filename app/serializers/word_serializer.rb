class WordSerializer < ActiveModel::Serializer
  attributes :id,
             :game_id,
             :round_played,
             :turn_played,
             :user_id,
             :text,
             :prompt_text,
             :score,
             :p_num
end
