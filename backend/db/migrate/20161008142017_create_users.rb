class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email
      t.string :password_digest
      t.boolean :enabled
      t.string :first_name
      t.string :last_name
      t.string :type_of_user

      t.timestamps
    end
  end
end
