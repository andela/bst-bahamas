class SubCategory < ActiveRecord::Base
	belongs_to :category
	has_many :classified_ad, dependent: :destroy
end
