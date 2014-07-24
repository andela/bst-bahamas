class SubCategory < ActiveRecord::Base
	belongs_to :category
	has_many :classified_ad, dependent: :destroy

	SUB_CATEGORY_JSON_OPTS = { :except => [:created_at, :updated_at], :methods => [:num_ads] }

	def as_json(options={})
	  super(SUB_CATEGORY_JSON_OPTS)
	end

	def num_ads
		ClassifiedAd.where("sub_category_id = ?", id).size()
	end
end
