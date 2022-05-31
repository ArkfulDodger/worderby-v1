class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :username,
             :is_bot,
             :current_games,
             :first_name,
             :last_name,
             :email,
             :phone,
             :highest_scoring_word,
             :games_played
end
