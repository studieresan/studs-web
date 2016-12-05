class ResumesController < ApplicationController
  before_filter :authenticate

  def show
    resume = User.find(params[:user_id]).resume || User.find(params[:user_id]).build_resume
    return render json: resume
  end

  def update
    resume = User.find(params[:user_id]).resume || User.find(params[:user_id]).build_resume
    if (current_user == resume.user || current_user.has_permission?('user_edit'))
      if resume.update(resume_params)
        return render json: resume
      end
    end

    render json: { error: '' }, status: 403
  end

  private
  def resume_params
    params.require(:resume).permit(:content)
  end
end
