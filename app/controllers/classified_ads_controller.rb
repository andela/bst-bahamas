class ClassifiedAdsController < ApplicationController
  def index
      @classified_ads = ClassifiedAd.all
      render json: @classified_ads, status: :ok
  end
    
  def new
      @classified_ad = ClassifiedAd.new
  end
    
  def create
      @user = User.find(params[:user_id])
      @classified_ad = @user.classified_ad.create(classified_ad_params)
      redirect_to 'user', :notice => "Successful upload"
  end
    
  private
    def classified_ad_params
        params.require(:classified_ad).permit(:poster_name, :poster_email, :photo)
    end
end
