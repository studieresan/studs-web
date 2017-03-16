class CreateFormdatas < ActiveRecord::Migration[5.0]
  def change
    create_table :formdatas, id: :uuid do |t|
      t.uuid :event_id
      t.string :type
      t.string :answers, array: true, default: []
    end
  end
end
