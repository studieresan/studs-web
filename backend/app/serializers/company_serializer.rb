class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :postal, :city, :country, :language, :information, :created_at, :updated_at
end
