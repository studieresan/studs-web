class AddPictureToUser < ActiveRecord::Migration[5.0]
  def change
    add_attachment :users, :picture
  end
end
