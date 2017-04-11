class Event < ApplicationRecord
  attr_accessor :before_form_replied, :after_form_replied

  belongs_to :company
  has_many :users
  has_one :formdata, class_name: 'Formdata'
  has_many :before_forms, -> { where type_of_form: 'before' }, class_name: 'UserEventForm'
  has_many :after_forms, -> { where type_of_form: 'after' }, class_name: 'UserEventForm'
end
