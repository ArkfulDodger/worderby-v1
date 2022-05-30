class Game < ApplicationRecord
  has_many :words
  belongs_to :player1, class_name: 'User', foreign_key: 'player1_id'
  belongs_to :player2, class_name: 'User', foreign_key: 'player2_id'
  belongs_to :challenger, class_name: 'User', foreign_key: 'challenger_id'
  belongs_to :challengee,
             class_name: 'User',
             foreign_key: 'challengee_id',
             optional: true

  def prompt
    prompt_word =
      if (is_over)
        return nil
      elsif (round === 1 && turn === 1)
        words.find_by(is_first_word: true)
      else
        if turn === 2
          words.find_by(round_played: round, turn_played: 1)
        else
          words.find_by(round_played: (round - 1), turn_played: 2)
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

  def is_word_played_this_turn
    words.last.round_played == round && words.last.turn_played == turn
  end

  def score(word_score)
    if turn == 1
      update(player1_score: player1_score + word_score)
    else
      update(player2_score: player2_score + word_score)
    end
  end

  def progress()
    puts '!!!!!PROGRESS INVOKED!!!!!!!'

    if turn == 1
      update(turn: 2)
    else
      if round == num_rounds
        update(is_over: true)
      else
        update(round: round + 1, turn: 1)
      end
    end
  end
end
