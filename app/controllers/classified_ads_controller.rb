class ClassifiedAdsController < ApplicationController
  before_action :set_user, only: [:create, :update]
  before_action :set_classified_ad, only: [:update, :destroy]

  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads.to_json, status: :ok
  end

  def create
      @classified_ad = @user.classified_ad.create(classified_ad_params)
      render json: @classified_ad.to_json, status: :ok
  end

  def update
    if @classified_ad.update(classified_ad_params)
      render json: @classified_ad.to_json, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @classified_ad.destroy
    render json: {}, status: :ok
  end

  def search
    if params.has_key?("q")
      results = ClassifiedAd.search_by_text(params[:q]).where(params.slice(:location_id, :sub_category_id))
    else
      results = ClassifiedAd.where(params.slice(:location_id, :sub_category_id))
    end
    render json: results.to_json, status: :ok
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
