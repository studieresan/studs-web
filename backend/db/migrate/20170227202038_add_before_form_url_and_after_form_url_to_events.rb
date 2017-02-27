class AddBeforeFormUrlAndAfterFormUrlToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :before_form_url, :string
    add_column :events, :after_form_url, :string
  end
end
