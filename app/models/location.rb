class Location < ActiveRecord::Base
	has_many :classified_ad, dependent: :destroy
end
