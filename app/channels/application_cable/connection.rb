module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      puts '------------connect fired--------------'
      puts 'connections: ' + ActionCable.server.connections.length.to_s
      self.current_user = find_verified_user
      puts 'connection user: ' + self.current_user.username.to_s
    end

    private

    def find_verified_user
      if current_user = User.find_by(id: cookies.signed[:user_id])
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
