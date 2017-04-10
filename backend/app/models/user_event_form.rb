require 'google_drive'

class UserEventForm < ApplicationRecord
  belongs_to :user
  belongs_to :event

  # @TODO: Cleanup messy logic
  # Run in prompt $ rails runner UserEventForm.update_forms
  def self.update_forms
    last_check = UserEventForm.order(:created_at).last.created_at
    session = GoogleDrive::Session.from_service_account_key("/drive/Studs2017-2dfe95d93af7.json")
    query = "(name contains 'Svar' or name contains 'Responses') and modifiedTime > '" + last_check.strftime('%FT%T%:z') + "'"
    spreadsheets = session.spreadsheets(q: query)

    spreadsheets.each do |file|
      event_id = Event.where(after_form_id: file.key).first.id
      type = "after"
      if event_id.blank?
        event_id = Event.where(before_form_id: file.key).first.id
        type = "before"
      end

      if event_id.present?
        rows = file.worksheets.first.rows
        rows.each_with_index do |row, i|
          next if i == 0 || row[0].nil?
          next if row[1].blank?
          first_name = row[1].split(/\s+/).first
          user_id = User.where(type_of_user: 'studs_member').where(first_name: first_name).first.id
          if user_id.present?
            content = row.to_json
            next if UserEventForm.exists?(user_id: user_id, event_id: event_id, type_of_form: type)
            UserEventForm.create(user_id: user_id, event_id: event_id, type_of_form: type, content: content)
          end
        end
      end
    end
  end
end
