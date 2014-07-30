class Tag < ActiveRecord::Base
	validates :name, :duration_in_days, :price, :presence => true
	def as_json(options={})
	  super(:except => [:created_at, :updated_at])
	end
end
