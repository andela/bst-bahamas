class ClassifiedAd < ActiveRecord::Base
	before_create :set_expiry_date, :set_feature_expiry_date, :set_tag_expiry_date
	before_update { |classified_ad| classified_ad.set_feature_expiry_date if classified_ad.is_featured_changed? }
	before_update { |classified_ad| classified_ad.set_tag_expiry_date if classified_ad.tag_changed? }
	include PgSearch
	pg_search_scope :search_by_text, :against => [:title, :description, :keywords], :using => {:tsearch => {:any_word => true}}
	belongs_to :user
	belongs_to :category
	belongs_to :sub_category
	belongs_to :location
	has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }
	has_attached_file :photo_1, :styles => { :medium => "300x300>", :thumb => "100x100>" }
	has_attached_file :photo_2, :styles => { :medium => "300x300>", :thumb => "100x100>" }
	validates_attachment_size :photo, :less_than => 5.megabytes
	validates_attachment_size :photo_1, :less_than => 5.megabytes
	validates_attachment_size :photo_2, :less_than => 5.megabytes
	validates_attachment :photo, :presence => true, :content_type => { :content_type => ["image/jpeg", "image/jpg", "image/png"] }
	validates :location_id, :category_id, :sub_category_id, :title, :description, :price, :poster_name, :presence => true
	validates :poster_email, :presence => true, :format => { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }

	def as_json(options={})
	  super(:except => [
	  	:updated_at, :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at,
	  	:updated_at, :photo_1_file_name, :photo_1_content_type, :photo_1_file_size, :photo_1_updated_at,
	  	:updated_at, :photo_2_file_name, :photo_2_content_type, :photo_2_file_size, :photo_2_updated_at],
	    :methods => [:photo_thumb_url, :photo_medium_url, :photo_1_medium_url, :photo_2_medium_url])
	end

	def photo_thumb_url
	   photo.url(:thumb)
	end

	def photo_medium_url
	   photo.url(:medium)
	end

	def photo_1_medium_url
	   photo_1.url(:medium)
	end

	def photo_2_medium_url
	   photo_2.url(:medium)
	end

	def set_expiry_date
	  self.expiry_date = Date.today + 30
	end

	def set_feature_expiry_date
	  if self.is_featured
	    self.feature_expiry_date = Date.today + 7
	  end
	end

	def set_tag_expiry_date
	  if self.tag
	    tag = Tag.find_by_name(self.tag)
	    self.tag_expiry_date = Date.today + tag.duration_in_days
	  end
	end
end