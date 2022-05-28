class TurnChannel < ApplicationCable::Channel
  def subscribed
    puts '---------------Subscribed---------------'
    puts params
    puts current_user.id
    stream_from "turn_channel_#{current_user.id}"
    # Message.create(content: data['content'])
  end

  def shoutout(args)
    puts '---------------Shoutout Invoked---------------'
    puts 'params: ' + params.to_s
    puts 'args: ' + args.to_s
    ActionCable.server.broadcast(
      "turn_channel_#{current_user.id}",
      { body: args['text'] }
    )
  end

  def unsubscribed
    puts '---------------Unsubscribed---------------'
    # Any cleanup needed when channel is unsubscribed
  end
end
