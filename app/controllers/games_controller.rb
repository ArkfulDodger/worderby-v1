class GamesController < ApplicationController
  # TODO: remove index from skip before
  skip_before_action :authorize, only: %i[index]
  before_action :find_game, only: %i[update show destroy]

  # GET /games
  def index
    games = Game.all
    render json: games
  end

  # GET /games/:id
  def show
    render json: @game
  end

  # POST /games
  def create
    used_params = game_params
    puts 'used_params before:' + used_params.to_s
    if used_params[:is_single_player] && !used_params[:player2_id]
      bot = User.find_by(is_bot: true)
      used_params[:player2_id] = bot[:id]
      used_params[:challengee_id] = bot[:id]
    end
    puts 'used_params after:' + used_params.to_s

    new_game = Game.create!(used_params)
    if new_game
      rand_word = Randword.get_random_word
      new_game.words.create!(text: rand_word, is_first_word: true)
      new_game.update(worderbyte: rand_word)
      render json: new_game, status: :created
    else
      puts 'did we reach this?'
    end
  end

  # PATCH /games/:id
  def update
    @game.update!(game_params)
    render json: @game, status: :accepted
  end

  # DELETE /games/:id
  def destroy
    @game.destroy

    head :no_content
    # render json: @game, status: :accepted
  end

  #temp route for MVP dev
  # GET /games/current
  def current
    # byebug
    render json: Game.last
  end

  private

  # permissible params to be used by create/update
  def game_params
    params.permit(
      :streak,
      :player1_id,
      :player2_id,
      :is_over,
      :num_rounds,
      :round,
      :turn,
      :player1_score,
      :player2_score,
      :is_single_player,
      :is_accepted,
      :challenger_id,
      :challengee_id,
      :worderbyte,
      restricted_endings: []
    )
  end

  # set instance variable for show/update/destroy
  def find_game
    @game = Game.find(params[:id])
  end
end
