class AddResponsibleUserIdToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :responsible_user_id, :uuid
  end
end
