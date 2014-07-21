class CreateClassifiedAds < ActiveRecord::Migration
  def change
    create_table :classified_ads do |t|
      t.integer :sub_category_id
      t.integer :user_id
      t.integer :location_id
      t.string :description
      t.string :keywords, array: true, default: '{}'
      t.string :poster_name
      t.string :poster_phone_no
      t.datetime :expiry_date
      t.boolean :is_featured
      t.datetime :feature_expiry_date
      t.string :tag
      t.datetime :tag_expiry_date
      t.references :user, index: true
      t.timestamps
    end
  end
end
