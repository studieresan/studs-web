class UpdateFormsController < ApplicationController
  require 'google_drive'
  require 'date'

  def init
    last_check = DateTime.new(2001,2,3)
  end

	def get_forms

    session = GoogleDrive::Session.from_service_account_key("Studs2017-2dfe95d93af7.json")
    query = "(name contains 'Svar' or name contains 'Responses') and modifiedTime > '" + last_check.strftime('%FT%T%:z') + "'"
    last_check = DateTime.now
    spreadsheets = session.spreadsheets(q: query)

    spreadsheets.each do |file|
      event_id = Event.where(after_form_id: file.key).first.id
      rows = file.worksheets.first.rows
      if (rows[0].length > 6)
        type = "after"
      elsif (rows[0].length == 4)
        type = "before"
      end
      rows.each_with_index do |row, i|
        next if i == 0 || row[0].nil?
        first_name = row[1].split(/\s+/).first
        user_id = User.where(first_name: first_name).first.id
        content = row.to_json
        next if UserEventForm.exists?(user_id: user_id, event_id: event_id, type_of_form: type)
        UserEventForm.create(user_id: user_id, event_id: event_id, type_of_form: type, content: content)
      end
    end

	end
end