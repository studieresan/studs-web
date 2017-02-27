class ChangeIdForEvents < ActiveRecord::Migration[5.0]
  def change
  	add_column :events, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    change_table :events do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE events ADD PRIMARY KEY (id);"
  end
end
