class Location < ActiveRecord::Base
	has_many :classified_ad, dependent: :destroy

	def as_json(options={})
	  super(:except => [:created_at, :updated_at])
	end
end
