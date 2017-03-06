class AddCompanyIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :company_id, :uuid
  end
end
