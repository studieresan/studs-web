class UserEventFormsController < ApplicationController
  #before_action :authenticate

  def index
    render json: UserEventForm.all
  end

  def mine
   render json: UserEventForm.where(user_id: current_user.id)
  end

  def show
    form = UserEventForm.where(event_id: params[:id])

    render json: form
  end

  def create
    # {formId=1eRzmhpWKPUVHO0o_8khCW0l_eALEuvmtM8JDl0i5rSI, values=[Mon Feb 27 20:15:55 GMT+01:00 2017, Jesper Bränn, 1. No, Not interested], sheetId=2_ABaOnueE_N9o2fC-kUKqmF_B0HrCbtc39FVD_2IyCxpFhSZxGpH4Y4_5V8DIww}

    content = params[:values]
    user = User.where(first_name: content[1].split(' ', 2)[0], last_name: content[1].split(' ', 2)[1]).first
    if params[:type_of_form] == 'before'
      event_id = Event.where(before_form_id: params[:formId]).first.id
    else
      event_id = Event.where(after_form_id: params[:formId]).first.id
    end

    form = UserEventForm.new(user_id: user.id, event_id: event_id, type_of_form: params[:type_of_form], content: content.to_json)

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
