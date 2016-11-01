class User < ApplicationRecord
  # type_of_user: [:studs_member, :studs_substitute, :company]
  has_secure_password

  def has_permission? permission
    if permissions.include?(permission) || permissions.include?('admin')
      true
    else
      false
    end
  end
end
