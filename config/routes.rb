Rails.application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'static_pages#index'

  resources :users do
    resources :classified_ads
  end

  get 'classified_ads/index'
  get 'classified_ads/search'

  resources :category,  :only => [:index]
  resources :location,  :only => [:index]
end
