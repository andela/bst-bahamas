class AddCategoryIdToClassifiedAd < ActiveRecord::Migration
  	def self.up
      add_column :classified_ads, :category_id, :string
    end

    def self.down
      remove_column :classified_ads, :category_id, :string
    end
end
