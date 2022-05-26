class UsersController < ApplicationController
  # TODO: remove index from skip before
  skip_before_action :authorize, only: %i[create index]
  # before_action :find_user, only: %i[show]

  # GET /users
  def index
    users = User.all
    render json: users
  end

  # POST /signup
  def create
    new_user = User.create!(user_params)
    session[:user_id] = new_user.id
    render json: new_user, status: :created
  end

  # # GET /users/:id
  # def show
  #   render json: @user
  # end

  # GET /me
  def auth
    render json: @current_user
  end

  private

  # # set instance variable for show/update/destroy
  # def find_user
  #   @user = User.find(params[:id])
  # end

  # permissible params to be used by create/update
  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
