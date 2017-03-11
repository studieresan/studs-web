class AddPublicTextAndFeedbackTextToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :public_text, :string
    add_column :events, :feedback_text, :string
  end
end
