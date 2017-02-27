class Event < ApplicationRecord
  belongs_to :company
  has_many :users
  has_many :before_forms, -> { where type_of_form: 'before' }, class_name: 'UserEventForm'
  has_many :after_forms, -> { where type_of_form: 'after' }, class_name: 'UserEventForm'
end
