class CompanySerializer < ActiveModel::Serializer
  attributes :name, :email, :phone, :address, :postal, :city, :country, :language, :information, :created_at, :updated_at
end
