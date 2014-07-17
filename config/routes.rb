Rails.application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'static_pages#index'

  resources :users
  resources :category,  :only => [:index]
  resources :location,  :only => [:index]
end
