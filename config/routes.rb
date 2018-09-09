Rails.application.routes.draw do
  devise_for :users
  resources :family do
    resources :guests
    resources :messages
  end
  resources :photos
end
