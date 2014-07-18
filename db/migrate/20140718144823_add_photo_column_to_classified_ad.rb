class AddPhotoColumnToClassifiedAd < ActiveRecord::Migration
  	def self.up
      add_attachment :classified_ads, :photo
    end

    def self.down
      remove_attachment :classified_ads, :photo
    end
end
