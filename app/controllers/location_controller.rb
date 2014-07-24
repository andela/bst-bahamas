class LocationController < ApplicationController
  def index
  	@locations = Location.all
  	render json: @locations, status: :ok
  end
end