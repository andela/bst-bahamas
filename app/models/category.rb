class Category < ActiveRecord::Base
	has_many :sub_category, dependent: :destroy

	def as_json(options={})
	  super(:except => [:created_at, :updated_at], :include => { :sub_category => SubCategory::SUB_CATEGORY_JSON_OPTS })
	end
end
