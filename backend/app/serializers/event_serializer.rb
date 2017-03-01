class EventSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :information, :company, :before_form_id, :after_form_id, :company_id, :before_form_url, :after_form_url, :responsible_user_id
end
