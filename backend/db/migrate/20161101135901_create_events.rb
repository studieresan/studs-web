class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :schedule
      t.string :information

      t.timestamps
    end
  end
end
