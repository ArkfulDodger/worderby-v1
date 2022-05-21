class Game < ApplicationRecord
  has_many :words
  belongs_to :player1, class_name: 'User', foreign_key: 'player1_id'
  belongs_to :player2, class_name: 'User', foreign_key: 'player2_id'

  def prompt
    prompt_word =
      if (round === 1 && turn === 1)
        words.find_by(is_first_word: true)
      elsif (is_over)
        nil
      else
        if turn === 2
          words.find_by(round_played: round, turn_played: 1)
        else
          words.find_by(round_played: round - 1, turn_played: 2)
        end
      end

    prompt = {
      id: prompt_word.id,
      text: prompt_word.text,
      p_num: prompt_word.p_num,
      score: prompt_word.score,
      is_first_word: prompt_word.is_first_word
    }
  end
end
