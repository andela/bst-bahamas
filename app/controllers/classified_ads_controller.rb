class ClassifiedAdsController < ApplicationController
  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads, status: :ok
  end
end
