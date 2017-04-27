class Event < ApplicationRecord
  attr_accessor :before_form_replied, :after_form_replied

  has_attached_file :picture_1, default_url: ''
  has_attached_file :picture_2, default_url: ''
  has_attached_file :picture_3, default_url: ''
  validates_attachment_content_type :picture_1, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :picture_2, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :picture_3, content_type: /\Aimage\/.*\z/

  belongs_to :company
  has_many :users
  has_one :formdata, class_name: 'Formdata'
  has_many :before_forms, -> { where type_of_form: 'before' }, class_name: 'UserEventForm'
  has_many :after_forms, -> { where type_of_form: 'after' }, class_name: 'UserEventForm'
end
