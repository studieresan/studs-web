class UsersController < ApplicationController
  before_filter :authenticate, except: [:update_by_token]

  def index
    render json: User.where(type_of_user: 'studs_member', enabled: true).order(first_name: :asc).order(last_name: :asc)
  end

  def show
    user = User.find(params[:id])

    render json: user
  end

  def me
    render json: current_user
  end

  def create
    if current_user.has_permission?('user_create')
      user = User.new(user_params)
      if user.save
        return render json: user
      end
    end

    render json: { error: '' }, status: 400
  end

  def update
    user = User.find(params[:id])
    if (current_user == user || current_user.has_permission?('user_edit'))
      if user.update(user_params)
        return render json: user
      end
    end

    render json: { error: '' }, status: 403
  end

  def update_by_token
    user = User.find_by_password_reset_token(params[:token])
    if (user.present? && user.password_reset_sent_at > 1.hours.ago)
      if user.update(user_params)
        return render json: user
      end
    end

    render json: { error: '' }, status: 403
  end

  def reset_password
    user = User.find_by_email(params[:email])
    if user.present?
      user.send_password_reset(:email)
      render status: 200
    else
      render status: 400
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :enabled, :type_of_user, :phone, :position, :master, :picture, :password_reset_token, :password_reset_sent_at)
  end
end
