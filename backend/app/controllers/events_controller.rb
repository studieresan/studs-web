require "google_drive"
class EventsController < ApplicationController
  before_action :authenticate

  # GET /events
  # GET /events.json
  def index
    if current_user.type_of_user == 'studs_member'
      events = Event.all
      events.map do |e|
        e.before_form_replied = current_user.before_form.exists?(event_id: e.id)
        e.after_form_replied = current_user.after_form.exists?(event_id: e.id)
      end

      render json: events
    else
      return render json: []
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
    event = Event.find(params[:id])
    if (current_user.type_of_user == 'studs_member' || event.users.exist?(current_user))
      render json: event
    else
      render json: { error: '' }, status: 403
    end
  end

  # POST /events
  # POST /events.json
  def create
    event = Event.new(event_params)

    if event.save
      render json: events
    else
      render json: { error: '' }, status: 403
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event
    else
      render json: { error: '' }, status: 403
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    event.destroy
  end

  def missing_forms
    if current_user.type_of_user == 'studs_member'
      event = Event.find(params[:id])
      lazy_before = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.before_forms.exists?(user_id: user.id) }.to_a

      lazy_after = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.after_forms.exists?(user_id: user.id) }.to_a

      render json: {before: lazy_before, after: lazy_after}
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:schedule, :information, :company, :before_form_id, :after_form_id, :company_id, :before_form_url, :after_form_url, :responsible_user_id, :date)
    end
end
