class CategoryController < ApplicationController
  def index
  	@categories = Category.includes(:sub_category)
  	render json: @categories.to_json(:except => [:created_at, :updated_at], :include => :sub_category), status: :ok
  end
end