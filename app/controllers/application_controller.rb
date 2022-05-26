class ApplicationController < ActionController::API
  include ActionController::Cookies

  # error handling for non-existent records and failed validations
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
  before_action :authorize

  private

  def authorize
    #temporarily always authorize user to first user for dev testing
    # @current_user = User.first

    @current_user = User.find_by(id: session[:user_id])

    # byebug

    unless @current_user
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  # response when requested record not in database
  def render_not_found_response
    render json: {
             error: "#{controller_name.classify} not found"
           },
           status: :not_found
  end

  # response when record failed validations to be created/updated
  def render_invalid_response(error_obj)
    render json: {
             errors: error_obj.record.errors.full_messages
           },
           status: :unprocessable_entity
  end
end
