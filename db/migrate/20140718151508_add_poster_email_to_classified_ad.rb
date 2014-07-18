class AddPosterEmailToClassifiedAd < ActiveRecord::Migration
  	def self.up
      add_column :classified_ads, :poster_email, :string
    end

    def self.down
      add_column :classified_ads, :poster_email, :string
    end
end
