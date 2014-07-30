class ChangeDataTypeForExpiryDates < ActiveRecord::Migration
  def self.up
    change_table :classified_ads do |t|
      t.change :expiry_date, :date
      t.change :feature_expiry_date, :date
      t.change :tag_expiry_date, :date
    end
  end

  def self.down
    change_table :classified_ads do |t|
      t.change :expiry_date, :datetime
      t.change :feature_expiry_date, :datetime
      t.change :tag_expiry_date, :datetime
    end
  end
end
