class AddTitleAndTypeToClassifiedAd < ActiveRecord::Migration
  	def self.up
      add_column :classified_ads, :title, :string
      add_column :classified_ads, :type, :string
      add_column :classified_ads, :price, :integer
    end

    def self.down
      remove_column :classified_ads, :title, :string
      remove_column :classified_ads, :type, :string
      remove_column :classified_ads, :price, :integer
    end
end