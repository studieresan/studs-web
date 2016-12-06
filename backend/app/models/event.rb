class Event < ApplicationRecord
	has_one :company
	has_many :users
end
