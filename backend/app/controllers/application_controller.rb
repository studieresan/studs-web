class ApplicationController < ActionController::API
  include ActionController::Serialization

  def home
    render json: {name: 'Studs 2017', api_version: '0.1'}.to_json
  end
end
