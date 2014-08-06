Rails.application.routes.draw do
  devise_for :users, :controllers => { :passwords => "passwords" }

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'static_pages#index'

  get 'classified_ads/search'
  get 'classified_ads/random_pics'
  get 'classified_ads/featured'
  post 'users/reset_password'
  put 'users/update_password'

  resources :users do
    resources :classified_ads
  end

  resources :classified_ads

  resources :category,  :only => [:index]
  resources :location,  :only => [:index]
  resources :tags,  :only => [:index]
  resources :charges,  :only => [:create]

end
