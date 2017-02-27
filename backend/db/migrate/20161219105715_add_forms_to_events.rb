class AddFormsToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :before_form_id, :string
    add_column :events, :after_form_id, :string
  end
end
