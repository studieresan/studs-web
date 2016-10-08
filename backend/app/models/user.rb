class User < ApplicationRecord
  # type_of_user: [:studs_member, :studs_substitute, :company]
  has_secure_password
end
