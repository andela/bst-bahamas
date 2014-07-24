class CategoryController < ApplicationController
  def index
  	@categories = Category.includes(:sub_category)
  	render json: @categories, status: :ok
  end
end