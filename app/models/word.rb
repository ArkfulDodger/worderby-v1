class Word < ApplicationRecord
  belongs_to :game
  belongs_to :user, optional: true
  has_one :game_prompt
end
