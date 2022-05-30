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
    new_game = Game.create!(game_params)
    rand_word = Randword.get_random_word
    new_game.words.create!(text: rand_word, is_first_word: true)
    render json: new_game, status: :created
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
      :challengee_id
    )
  end

  # set instance variable for show/update/destroy
  def find_game
    @game = Game.find(params[:id])
  end
end
