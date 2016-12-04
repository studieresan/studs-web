class CreateResumes < ActiveRecord::Migration[5.0]
  def change
    create_table :resumes, id: :uuid do |t|
      t.uuid :user_id
      t.jsonb :content

      t.timestamps
    end
  end
end
