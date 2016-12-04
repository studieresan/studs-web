class User < ApplicationRecord
	require 'net/http'
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

  def send_password_reset
    # mail_body = render_to_string(action: 'users/_email_reset', :layout => false)

  	generate_token(:password_reset_token)
  	self.password_reset_sent_at = Time.zone.now
  	save!

    mail_body = "<h2>Hi!</h2><p>To reset your password for studieresan.se, please click <a href=\"https://studieresan.se/password_reset?token=#{password_reset_token}\">this link</a>.</p><p>Best regards,<br>Studs IT </p>"

    mail_api_key = ENV['SPAM_API_KEY']
  	uri = URI('https://spam.datasektionen.se/api/sendmail')
		res = Net::HTTP.post_form(uri, from: 'noreply@studs-it.datasektionen.se', to: email, subject: 'Reset password', html: mail_body, key: mail_api_key)
  end

  def generate_token(column)
	  begin
	    self[column] = SecureRandom.urlsafe_base64
	  end while User.exists?(column => self[column])
	end
end
