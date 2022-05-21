class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  # POST '/login'
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {
               error: 'Invalid Username or Password'
             },
             status: :unauthorized
    end
  end

  # DELETE '/logout'
  def destroy
    session.delete :user_id
    head :no_content
    # render json: { message: "Sucessfully logged out" }, status: :accepted
  end
end
