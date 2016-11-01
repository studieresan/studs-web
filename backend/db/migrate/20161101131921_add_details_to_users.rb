class AddDetailsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :phone, :string
    add_column :users, :position, :string
    add_column :users, :master, :string
  end
end
