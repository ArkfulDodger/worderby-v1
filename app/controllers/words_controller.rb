class WordsController < ApplicationController
  # POST /words
  def create
    new_word = Word.create!(word_params)
    game = new_word.game

    # update score and increment round/turn
    if game.turn == 1
      game.update(player1_score: game.player1_score + new_word.score, turn: 2)
    else
      game.update(player2_score: game.player2_score + new_word.score)

      if game.round == game.num_rounds
        game.update(is_over: true)
      else
        game.update(round: game.round + 1, turn: 1)
      end
    end

    render json: game, status: :created
  end

  private

  # permissible params to be used by create/update
  def word_params
    params.permit(
      :game_id,
      :round_played,
      :turn_played,
      :user_id,
      :text,
      :prompt_text,
      :p_num,
      :score,
      :is_first_word
    )
  end

  # permissible params to be used by create/update
  def item_params
    params.permit(:id)
  end
end
