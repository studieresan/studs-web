class EventSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :information, :company, :before_form_id, :after_form_id,
    :company_id, :before_form_url, :after_form_url, :before_form_replied, :after_form_replied,
    :responsible_user_id, :date, :public_text, :feedback_text, :formdata

  attribute :picture_1, if: :has_pictures?
  attribute :picture_2, if: :has_pictures?
  attribute :picture_3, if: :has_pictures?

  def has_pictures?
    object.picture_1 && object.picture_2 && object.picture_3
  end
end
