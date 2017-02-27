class EventsController < ApplicationController
  before_action :authenticate
  require "google_drive"

  # GET /events
  # GET /events.json
  def index
    render json: Event.all
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
      render json: event
    else
      render json: { error: '' }, status: 403
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
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

  def users_missing_before_forms
    lazy = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.before_forms.exists?(user_id: user.id) }.to_a

    render json: lazy
  end

  def users_missing_after_forms
    lazy = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.after_forms.exists?(user_id: user.id) }.to_a

    render json: lazy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:schedule, :information, :before_form_id, :after_form_id)
    end
end
