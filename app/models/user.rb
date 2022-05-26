class User < ApplicationRecord
  # has_many :games
  has_many :words
  has_secure_password

  def current_games
    gameobjs = Game.where(player1_id: id, is_over: false) + Game.where(player2_id: id, is_over: false)
    games = gameobjs.map { |game|  {
      id: game.id,
      player1: game.player1,
      player2: game.player2,
      is_over: game.is_over,
      round: game.round,
      turn: game.turn,
      player1_score: game.player1_score,
      player2_score: game.player2_score,
      is_single_player: game.is_single_player
    } }
  end
end
