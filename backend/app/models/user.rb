class User < ApplicationRecord
	require 'net/http'
  # type_of_user: [:studs_member, :studs_substitute, :company]
  has_secure_password

  def has_permission? permission
    if permissions.include?(permission) || permissions.include?('admin')
      true
    else
      false
    end
  end

  def send_password_reset email
  	prettymail = '<h2>Hi!</h2><p>To reset your password for studieresan.se, please click<a href="https://studieresan.se/password_reset?token=#{token}">this link</a>.</p><p>Best regards,<br>Studs IT </p>'
  	generate_token(:password_reset_token)
  	self.password_reset_sent_at = Time.zone.now
  	save!
  	uri = URI('http://spam.datasektionen.se')
		res = Net::HTTP.post_form(uri, from: 'norepy@studs-it.datasektionen.se', to: email, subject: 'Reset password', html: prettymail, key: magicalkey)
  end

  def generate_token(column)
	  begin
	    self[column] = SecureRandom.urlsafe_base64
	  end while User.exists?(column => self[column])
	end
end
