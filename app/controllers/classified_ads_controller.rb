class ClassifiedAdsController < ApplicationController
  # before_action :set_user, only: [:create, :update]
  before_action :set_classified_ad, only: [:update, :destroy]
  skip_before_filter :authenticate_user!

  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads, status: :ok
  end

  def create
    p current_user
    @user = current_user
    if @user
      @classified_ad = current_user.classified_ad.create(classified_ad_params)
    else
      @user = User.new({:email => classified_ad_params[:poster_email]})
      @user.save
      @classified_ad = @user.classified_ad.create(classified_ad_params)
    end
    ClassifiedAdNotifier.send_active_ad_email(@user, @classified_ad).deliver
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
  #  category_id       - filter by category
  #  sub_category_id   - filter by sub category
  #  page              - page number for pagination
  #  per               - num results per page for pagination (default 25)
  def search
    page = params[:page] ? params[:page].to_i - 1 : 0
    per = params[:per] ? params[:per].to_i : 25
    numResults = 0
    totalPages = 0

    if params.has_key?("q")
      numResults = ClassifiedAd.search_by_text(params[:q]).where(params.slice(:location_id, :category_id, :sub_category_id)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.search_by_text(params[:q]).where(params.slice(:location_id, :category_id, :sub_category_id)).offset(page*per).limit(per)
    else
      numResults = ClassifiedAd.where(params.slice(:location_id, :category_id, :sub_category_id)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.where(params.slice(:location_id, :category_id, :sub_category_id)).offset(page*per).limit(per)
    end
    page = page + 1
    render json: {:page => page, :numResults => numResults, :totalPages => totalPages, :ads => results.as_json}, status: :ok
  end

  def random_pics
    max_id = ClassifiedAd.maximum("id")
    min_id = ClassifiedAd.minimum("id")
    id_range = max_id - min_id + 1
    random_id = min_id + rand(id_range).to_i
    result = ClassifiedAd.where("id >= ?", random_id).limit(10)#.sort("id")
    render json: result, status: :ok
  end

  private
    def classified_ad_params
        params.permit(:poster_name, :poster_email, :photo, :location_id, :sub_category_id, :id)
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
