Rails.application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'static_pages#index'

  get 'classified_ads/index'
  get 'classified_ads/search'
  get 'classified_ads/random_pics'

  resources :classified_ads

  resources :category,  :only => [:index]
  resources :location,  :only => [:index]

  # match "/*path" => redirect("/%{path}"), via: :all
end
