Rails.application.routes.draw do
  devise_for :users

  namespace :admin do
    resources :families
    resources :messages
    resources :guests
    resources :photos
  end

  resources :families, only: [:show, :update] do
    resources :guests, only: [:show, :update]
    resources :messages, only: [:create, :show, :update]
  end
  resources :photos
end
