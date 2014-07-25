class ClassifiedAdNotifier < ActionMailer::Base
  default from: "donotreply@bstbahamas.com"

  def send_active_ad_email(classified_ad)
    @classified_ad = classified_ad
    mail( :to => @classified_ad.poster_email,
    :subject => "Your BST-Bahamas ad #{@classified_ad.title} is now active." )
  end
end
