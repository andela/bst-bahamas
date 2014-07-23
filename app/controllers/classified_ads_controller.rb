class ClassifiedAdsController < ApplicationController
  before_action :set_user, only: [:create, :update]
  before_action :set_classified_ad, only: [:update, :destroy]

  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads, status: :ok
  end

  def create
      @classified_ad = @user.classified_ad.create(classified_ad_params)
      render json: @classified_ad, status: :ok
  end

  def update
    if @classified_ad.update(classified_ad_params)
      render json: @classified_ad, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @classified_ad.destroy
    render json: {}, status: :ok
  end

  # GET /classified_ads/search
  # Params
  #  q                 - query string for full text search
  #  location_id       - filter by location
  #  sub_category_id   - filter by category
  #  page              - page number for pagination
  #  per               - num results per page for pagination (default 25)
  def search
    page = params[:page] ? params[:page].to_i - 1 : 0
    per = params[:per] ? params[:per].to_i : 25
    numResults = 0
    totalPages = 0

    if params.has_key?("q")
      numResults = ClassifiedAd.search_by_text(params[:q]).where(params.slice(:location_id, :sub_category_id)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.search_by_text(params[:q]).where(params.slice(:location_id, :sub_category_id)).offset(page*per).limit(per)
    else
      numResults = ClassifiedAd.where(params.slice(:location_id, :sub_category_id)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.where(params.slice(:location_id, :sub_category_id)).offset(page*per).limit(per)
    end
    page = page + 1
    render json: {:page => page, :numResults => numResults, :totalPages => totalPages, :ads => results.as_json}, status: :ok
  end

  private
    def classified_ad_params
        params.permit(:poster_name, :poster_email, :photo, :user_id, :location_id, :sub_category_id, :id)
    end

    def set_user
      @user = User.find(params[:user_id])
      rescue ActiveRecord::RecordNotFound
        render json: {message: "User not found"}, status: 404
    end

    def set_classified_ad
      @classified_ad = ClassifiedAd.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: {message: "Classified Ad not found"}, status: 404
    end
end
