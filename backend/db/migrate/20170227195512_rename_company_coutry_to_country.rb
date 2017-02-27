class RenameCompanyCoutryToCountry < ActiveRecord::Migration[5.0]
  def change
    rename_column :companies, :coutry, :country
  end
end
