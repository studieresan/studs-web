class ApplicationController < ActionController::API
  include ActionController::Serialization

  def home
    render json: {name: 'Studs 2017', api_version: '0.1'}.to_json
  end

  protected
  def authenticate
    authenticate_or_request_with_http_basic do |email, password|
      user = User.find_by_email(email)
      user && user.authenticate(password)
    end
  end
end
