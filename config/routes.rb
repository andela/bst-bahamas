Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'static_pages#index'

  resources :users
  post '/users/log_in', to: 'users#log_in'
end
