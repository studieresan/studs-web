require "google_drive"

class EventsController < ApplicationController
  before_action :authenticate

  # GET /events
  # GET /events.json
  def index
    if current_user.type_of_user == 'studs_member'
      events = Event.all.order(date: :asc)
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
      lazy_before = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.before_forms.exists?(user_id: user.id) }.map { |user| UserSerializer.new(user) }.to_a

      lazy_after = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.after_forms.exists?(user_id: user.id) }.map { |user| UserSerializer.new(user) }.to_a

      render json: {before: lazy_before, after: lazy_after}
    end
  end

  def remind_before
    if current_user.has_permission?('event')
      event = Event.find(params[:id])
      lazy_before = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.before_forms.exists?(user_id: user.id) }.to_a
      recipients = lazy_before.map(&:slack_id)
      groups = (recipients.length / 7.0).ceil
      groups.times do
        slice = recipients[0 .. 6]
        slice.push(current_user.slack_id)
        users = slice.join(',')

        uri = URI.parse("https://slack.com/api/mpim.open")
        path = File.join 'drive', 'slack_token'
        params = {"token" => File.open(path).read, "users" => users}
        response = Net::HTTP.post_form(uri, params)
        response = JSON.parse(response.body)
        channel = response["group"]["id"]

        text = "Du har inte fyllt i före-formuläret för eventet hos " + event.company.name + ". Här hittar du enkäten: " + event.before_form_url
        uri = URI.parse("https://slack.com/api/chat.postMessage")
        params = {"token" => File.open(path).read, "channel" => channel, "text" => text}
        response = Net::HTTP.post_form(uri, params)

        recipients = recipients.drop(7)
      end
    end
  end

  def remind_after
    if current_user.has_permission?('event')
      event = Event.find(params[:id])
      lazy_after = User.where(type_of_user: 'studs_member', enabled: true).reject { |user| event.after_forms.exists?(user_id: user.id) }.to_a
      recipients = lazy_after.map(&:slack_id)
      groups = (recipients.length / 7.0).ceil
      groups.times do
        slice = recipients[0 .. 6]
        slice.push(current_user.slack_id)
        users = slice.join(',')

        uri = URI.parse("https://slack.com/api/mpim.open")
        path = File.join '/drive', 'slack_token'
        params = {"token" => File.open(path).read, "users" => users}
        response = Net::HTTP.post_form(uri, params)
        response = JSON.parse(response.body)
        channel = response["group"]["id"]

        text = "Du har inte fyllt i efter-formuläret för eventet hos " + event.company.name + ". Här hittar du enkäten: " + event.after_form_url
        uri = URI.parse("https://slack.com/api/chat.postMessage")
        params = {"token" => File.open(path).read, "channel" => channel, "text" => text}
        response = Net::HTTP.post_form(uri, params)

        recipients = recipients.drop(7)
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:schedule, :information, :company, :before_form_id, :after_form_id, :company_id, :before_form_url, :after_form_url, :responsible_user_id, :date, :feedback_text, :public_text)
    end
end
