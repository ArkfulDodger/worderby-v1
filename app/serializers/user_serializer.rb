class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :is_bot, :current_games
end
