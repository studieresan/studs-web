class ResumesController < ApplicationController
  before_filter :authenticate

  def show
    if current_user.has_permission?('resume_get')
      resume = User.find(params[:user_id]).resume || User.find(params[:user_id]).build_resume
      return render json: resume
    end

    render json: { error: 'Not allowed'}, status: 403
  end

  def create
    resume = current_user.build_resume(resume_params)
    if resume.save
      return render json: resume
    end

    render json: { error: '' }, status: 400
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
