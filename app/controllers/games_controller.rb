class GamesController < ApplicationController
  # before_action :find_game, only: %i[show]

  # GET /games/:id
  # def show
  #   render json: @game
  # end

  #temp route for MVP dev
  # GET /games/current
  def current
    # byebug
    render json: Game.last
  end

  private

  # set instance variable for show/update/destroy
  # def find_game
  #   @game = Game.find(params[:id])
  # end
end
