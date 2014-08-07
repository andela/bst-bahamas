class AddPhotosColumnsToClassifiedAd < ActiveRecord::Migration
  	def self.up
      add_attachment :classified_ads, :photo_1
      add_attachment :classified_ads, :photo_2
    end

    def self.down
      remove_attachment :classified_ads, :photo_1
      remove_attachment :classified_ads, :photo_2
    end
end
