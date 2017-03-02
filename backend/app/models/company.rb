class Company < ApplicationRecord
	has_one :event
	has_many :users
end
