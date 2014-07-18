class ClassifiedAd < ActiveRecord::Base
	belongs_to :user
	belongs_to :sub_category
	belongs_to :location
	has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" },
					:path => "#{Rails.root}/public/photo_attachment/:id/:style/:basename.:extension",
					:url => "/photo_attachment/:id/:style/:basename.:extension"
	validates_attachment_size :photo, :less_than => 5.megabytes
	validates_attachment :photo, :presence => true, :content_type => { :content_type => ["image/jpeg", "image/jpg", "image/png"] }
	validates :poster_name, :presence => true
	validates :poster_email, :presence => true, :format => { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
end
