class TurnChannel < ApplicationCable::Channel
  def subscribed
    puts '---------------Subscribed---------------'
    puts 'params id: ' + params['id'].to_s

    stream_from "turn_channel_#{params['id']}"
  end

  def turn_played
    puts '---------------Channel: Turn Played---------------'
    puts 'params id: ' + params['id'].to_s

    ActionCable.server.broadcast(
      "turn_channel_#{params['id']}",
      { body: 'turn played', player: current_user.id }
    )
  end

  def rematch_offered(args)
    puts '---------------Channel: Rematch Offered---------------'
    puts 'params id: ' + params['id'].to_s
    puts 'params:' + params.to_s
    puts 'args:' + args.to_s

    ActionCable.server.broadcast(
      "turn_channel_#{params['id']}",
      {
        body: 'rematch offered',
        player: current_user.id,
        game_id: args['game_id']
      }
    )
  end

  def rematch_accepted
    puts '---------------Channel: Rematch Accepted---------------'
    puts 'params id: ' + params['id'].to_s

    ActionCable.server.broadcast(
      "turn_channel_#{params['id']}",
      { body: 'rematch accepted', player: current_user.id }
    )
  end

  def unsubscribed
    puts '---------------Unsubscribed---------------'
    puts 'params id: ' + params['id'].to_s

    stop_stream_from "turn_channel_#{params['id']}"
  end

  # def shoutout(args)
  #   puts '---------------Shoutout Invoked---------------'
  #   puts 'params: ' + params.to_s
  #   puts 'args: ' + args.to_s
  #   ActionCable.server.broadcast(
  #     "turn_channel_#{current_user.id}",
  #     { body: args['text'] }
  #   )
  # end
end
