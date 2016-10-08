class AddPermissionsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :permissions, :text, array: true, default: []
  end
end
