# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170410185132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "companies", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "address"
    t.string   "postal"
    t.string   "city"
    t.string   "country"
    t.string   "language"
    t.string   "information"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "schedule"
    t.string   "information"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "before_form_id"
    t.string   "after_form_id"
    t.uuid     "company_id"
    t.string   "before_form_url"
    t.string   "after_form_url"
    t.uuid     "responsible_user_id"
    t.datetime "date"
    t.string   "public_text"
    t.string   "feedback_text"
  end

  create_table "formdata", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid   "event_id"
    t.string "knowdoes",        default: [], array: true
    t.string "before_interest", default: [], array: true
    t.string "after_interest",  default: [], array: true
    t.string "qualified",       default: [], array: true
  end

  create_table "resumes", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "user_id"
    t.jsonb    "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_event_forms", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "user_id"
    t.uuid     "event_id"
    t.string   "type_of_form"
    t.jsonb    "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.boolean  "enabled"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "type_of_user"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.text     "permissions",            default: [],              array: true
    t.string   "phone"
    t.string   "position"
    t.string   "master"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "slack_id"
    t.uuid     "company_id"
  end

end
