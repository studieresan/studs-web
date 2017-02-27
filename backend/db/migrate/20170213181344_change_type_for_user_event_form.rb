class ChangeTypeForUserEventForm < ActiveRecord::Migration[5.0]
  def change
    rename_column :user_event_forms, :type, :type_of_form
  end
end
