class User < ApplicationRecord
  has_many :games
  has_many :words
  has_many :game_words, class_name: 'Word', through: :games
end
