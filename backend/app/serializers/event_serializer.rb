class EventSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :information, :company, :before_form_id, :after_form_id, :company_id, :before_form_url, :after_form_url, :before_form_replied, :after_form_replied, :responsible_user_id, :date
end
