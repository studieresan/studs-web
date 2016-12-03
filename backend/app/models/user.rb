class User < ApplicationRecord
  # type_of_user: [:studs_member, :studs_substitute, :company]
  has_attached_file :picture
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\z/

  has_one :resume
  has_secure_password

  def has_permission? permission
    if permissions.include?(permission) || permissions.include?('admin')
      true
    else
      false
    end
  end
end
