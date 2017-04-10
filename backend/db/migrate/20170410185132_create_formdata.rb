class CreateFormdata < ActiveRecord::Migration[5.0]
  def change
    create_table :formdata, id: :uuid do |t|
      t.uuid :event_id
      t.string :knowdoes, array: true, default: []
      t.string :before_interest, array: true, default: []
      t.string :after_interest, array: true, default: []
      t.string :qualified, array: true, default: []
    end
  end
end
