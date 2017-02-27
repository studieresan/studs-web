class EventSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :information, :company
end
