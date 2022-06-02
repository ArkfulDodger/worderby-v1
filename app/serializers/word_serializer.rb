class WordSerializer < ActiveModel::Serializer
  attributes :id,
             :game_id,
             :round_played,
             :turn_played,
             :user_id,
             :text,
             :prompt_text,
             :score,
             :p_num,
             :is_first_word,
             :time_penalty
end
