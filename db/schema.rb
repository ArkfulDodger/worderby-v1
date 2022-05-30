# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_30_190246) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.integer "player1_id"
    t.integer "player2_id"
    t.boolean "is_over"
    t.integer "num_rounds"
    t.integer "round"
    t.integer "turn"
    t.integer "player1_score"
    t.integer "player2_score"
    t.boolean "is_single_player"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_accepted"
    t.integer "challenger_id"
    t.integer "challengee_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.boolean "is_bot", default: false
  end

  create_table "words", force: :cascade do |t|
    t.integer "game_id"
    t.integer "round_played"
    t.integer "turn_played"
    t.integer "user_id"
    t.string "text"
    t.string "prompt_text"
    t.integer "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_first_word"
    t.integer "p_num"
  end

end
