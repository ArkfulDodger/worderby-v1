class WordSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :round_played, :turn_played, :user_id, :text, :prompt_text, :prompt_letters_substring, :input_letters_substring, :total_score
end
