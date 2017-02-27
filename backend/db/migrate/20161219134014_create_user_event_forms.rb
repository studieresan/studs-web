class CreateUserEventForms < ActiveRecord::Migration[5.0]
  def change
    create_table :user_event_forms, id: :uuid do |t|
      t.uuid :user_id
      t.uuid :event_id
      t.string :type
      t.jsonb :content

      t.timestamps
    end
  end
end
