class CreateCompany < ActiveRecord::Migration[5.0]
  def change
    create_table :companies, id: :uuid do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :address
      t.string :postal
      t.string :city
      t.string :coutry
      t.string :language
      t.string :information

      t.timestamps
    end
  end
end
