require "google_drive"

class FormdataController < ApplicationController
  before_action :authenticate

  def import_data
    event = Event.find(params[:id])
    knowdoes = Array.new
    before_interest = Array.new
    after_interest = Array.new
    qualified = Array.new
    session = GoogleDrive::Session.from_service_account_key("/drive/Studs2017-2dfe95d93af7.json")
    spreadsheet = session.file_by_id(event.before_form_id)
    rows = spreadsheet.worksheets.first.rows
    rows.each_with_index do |row, i|
      if (i != 0 && !row[2].empty? && !row[3].empty?)
        knowdoes.push(row[2])
        before_interest.push(row[3])
      end
    end
    spreadsheet = session.file_by_id(event.after_form_id)
    rows = spreadsheet.worksheets.first.rows
    rows.each_with_index do |row, i|
      if (i != 0 && !row[2].empty? && !row[3].empty?)
        after_interest.push(row[2])
        qualified.push(row[3])
      end
    end
    if (Formdata.where(event_id: event.id).exists?)
      Formdata.where(event_id: event.id).first.update(knowdoes: knowdoes, 
        before_interest: before_interest, after_interest: after_interest, qualified:qualified)
    else
      Formdata.create(event_id: event.id, knowdoes: knowdoes, 
        before_interest: before_interest, after_interest: after_interest, qualified:qualified)
    end
  end
end
