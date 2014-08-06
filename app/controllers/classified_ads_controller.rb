class ClassifiedAdsController < ApplicationController
  before_action :set_classified_ad, only: [:show, :update, :destroy]

  def index
    page = params[:page] ? params[:page].to_i - 1 : 0
    per = params[:per] ? params[:per].to_i : 25
    numResults = 0
    totalPages = 0

    @user = current_user
    if @user
      numResults = @user.classified_ad.size()
      totalPages = (numResults / per.to_f).ceil
      @classified_ads = @user.classified_ad.order('created_at DESC').offset(page*per).limit(per)
    else
      numResults = ClassifiedAd.all.size()
      totalPages = (numResults / per.to_f).ceil
      @classified_ads = ClassifiedAd.all.order('created_at DESC').offset(page*per).limit(per)
    end
    page = page + 1
    render json: {:per => per, :page => page, :numResults => numResults, :totalPages => totalPages, :ads => @classified_ads.as_json}, status: :ok
  end

  def show
    render json: @classified_ad
  end

  def create
    @user = current_user
    if @user
      @classified_ad = current_user.classified_ad.create(classified_ad_params)
    else
      @classified_ad = ClassifiedAd.create(classified_ad_params)
    end

    if @classified_ad.id
      ClassifiedAdNotifier.send_active_ad_email(@classified_ad).deliver
    end

    if @classified_ad.errors.any?
      render json: {:errors => @classified_ad.errors}, status: 500
    else
      render json: @classified_ad, status: :ok
    end
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
  #  is_featured       - filter featured ads
  #  page              - page number for pagination
  #  per               - num results per page for pagination (default 25)
  def search
    page = params[:page] ? params[:page].to_i - 1 : 0
    per = params[:per] ? params[:per].to_i : 25
    sort_by = params[:sort_by] ? params[:sort_by] : 'created_at DESC'
    numResults = 0
    totalPages = 0

    if params.has_key?("q")
      numResults = ClassifiedAd.search_by_text(params[:q]).where("expiry_date > ?", Date.today).where(params.slice(:location_id, :category_id, :sub_category_id, :is_featured)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.search_by_text(params[:q]).where("expiry_date > ?", Date.today).where(params.slice(:location_id, :category_id, :sub_category_id, :is_featured)).order(sort_by).offset(page*per).limit(per)
    else
      numResults = ClassifiedAd.where("expiry_date > ?", Date.today).where(params.slice(:location_id, :category_id, :sub_category_id, :is_featured)).size()
      totalPages = (numResults / per.to_f).ceil
      results = ClassifiedAd.where("expiry_date > ?", Date.today).where(params.slice(:location_id, :category_id, :sub_category_id, :is_featured)).order(sort_by).offset(page*per).limit(per)
    end
    page = page + 1
    render json: {:per => per, :page => page, :numResults => numResults, :totalPages => totalPages, :ads => results.as_json}, status: :ok
  end

  def random_pics
    max_id = ClassifiedAd.maximum("id")
    min_id = ClassifiedAd.minimum("id")
    id_range = max_id - min_id + 1
    random_id = min_id + rand(id_range).to_i
    result = ClassifiedAd.where("expiry_date > ?", Date.today).where("id >= ?", random_id).limit(10)
    render json: result, status: :ok
  end

  def featured
    page = params[:page] ? params[:page].to_i - 1 : 0
    per = params[:per] ? params[:per].to_i : 25
    numResults = 0
    totalPages = 0

    numResults = ClassifiedAd.where("is_featured = ? AND feature_expiry_date > ? AND expiry_date > ?", 'true', Date.today, Date.today).size()
    totalPages = (numResults / per.to_f).ceil
    results = ClassifiedAd.where("is_featured = ? AND feature_expiry_date > ? AND expiry_date > ?", 'true', Date.today, Date.today).order('created_at DESC').offset(page*per).limit(per)

    page = page + 1
    render json: {:per => per, :page => page, :numResults => numResults, :totalPages => totalPages, :ads => results.as_json}, status: :ok
  end

  private
    def classified_ad_params
        params.permit(:title, :price, :description, :poster_name, :poster_email, :poster_phone_no, :photo, :is_featured, :tag, :location_id, :category_id, :sub_category_id, :user_id, :id)
    end

    def set_classified_ad
      @classified_ad = ClassifiedAd.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: {message: "Classified Ad not found"}, status: 404
    end
end
