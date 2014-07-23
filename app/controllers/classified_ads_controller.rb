class ClassifiedAdsController < ApplicationController
  before_action :set_user, only: [:create, :update]
  before_action :set_classified_ad, only: [:update, :destroy]

  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads.to_json(
        :except => [:created_at, :updated_at, :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at],
        :methods => [:photo_thumb_url, :photo_medium_url]), status: :ok
  end

  def create
      @classified_ad = @user.classified_ad.create(classified_ad_params)
      render json: @classified_ad.to_json(
        :except => [:created_at, :updated_at, :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at],
        :methods => [:photo_thumb_url, :photo_medium_url]), status: :ok
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
