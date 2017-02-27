class UserEventFormsController < ApplicationController
  before_action :authenticate

  def index
    render json: UserEventForm.all
  end

  def show
    form = UserEventForm.find(params[:id])

    render json: form
  end

  def create
    form = UserEventForm.new(user_event_form_params)
    if form.save
      return render json: form
    end

    render json: { error: '' }, status: 400
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = UserEventForm.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:user_event_form).permit(:user_id, :event_id, :type_of_form, :content)
    end
end