class TurnChannel < ApplicationCable::Channel
  def subscribed
    stream_from "turn_channel_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
