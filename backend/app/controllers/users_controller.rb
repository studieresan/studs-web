class UsersController < ApplicationController
  def index
    render json: User.where(type_of_user: 'studs_member')
  end
end
