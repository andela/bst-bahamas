class ClassifiedAdsController < ApplicationController
  before_action :set_user, only: [:create]

  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads.to_json(:methods => [:photo_thumb_url, :photo_medium_url]), status: :ok
  end

  def create
      @classified_ad = @user.classified_ad.create(classified_ad_params)
      render json: @classified_ad.to_json(:methods => [:photo_thumb_url, :photo_medium_url]), status: :ok
  end

  private
    def classified_ad_params
        params.permit(:poster_name, :poster_email, :photo, :user_id)
    end

    def set_user
      @user = User.find(params[:user_id])
      rescue ActiveRecord::RecordNotFound
        render json: {message: "User not found"}, status: 404
    end
end
