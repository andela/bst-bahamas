class CategoryController < ApplicationController
  def index
  	@categories = Category.includes(:sub_category)
  	render json: @categories.to_json(:include => :sub_category), status: :ok
  end
end