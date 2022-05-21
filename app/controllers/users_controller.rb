class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  # POST /signup
  def create
    new_user = User.create!(user_params)
    session[:user_id] = new_user.id
    render json: new_user, status: :created
  end

  # GET /me
  def show
    render json: @current_user
  end

  private

  # permissible params to be used by create/update
  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
