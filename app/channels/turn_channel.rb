class TurnChannel < ApplicationCable::Channel
  def subscribed
    puts '---------------Subscribed---------------'
    puts params
    puts current_user.id
    stream_from "turn_channel_#{current_user.id}"
    # Message.create(content: data['content'])
  end

  def shoutout
    puts '---------------Shoutout Invoked---------------'
    puts params
  end

  def unsubscribed
    puts '---------------Unsubscribed---------------'
    # Any cleanup needed when channel is unsubscribed
  end
end
