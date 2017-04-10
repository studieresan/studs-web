class AddPicturesToEvents < ActiveRecord::Migration[5.0]
  def up
    add_attachment :events, :picture_1
    add_attachment :events, :picture_2
    add_attachment :events, :picture_3
  end

  def down
    remove_attachment :events, :picture_1
    remove_attachment :events, :picture_2
    remove_attachment :events, :picture_3
  end
end
