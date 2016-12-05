class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Basic::ControllerMethods
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::Serialization

  prepend_before_action :logged_in

  def home
    render json: {name: 'Studs 2017', api_version: '0.1'}.to_json
  end

  def current_user
    @current_user
  end

  protected
  def logged_in
    user = nil
    user, pass = ActionController::HttpAuthentication::Basic::user_name_and_password(request)

    if user.present? && pass.present?
      is_authenticated = authenticate_or_request_with_http_basic do |email, password|
        user = User.find_by_email(email)
        user && user.authenticate(password)
      end
      @current_user = user if is_authenticated
    end
  end

  def authenticate
    return head 403 if current_user.blank?
  end
end
