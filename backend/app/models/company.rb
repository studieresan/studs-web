class Company < ApplicationRecord
	has_one :events
	has_many :users
end
