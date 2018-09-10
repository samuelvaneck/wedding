Rails.application.routes.draw do
  devise_for :users

  namespace :admin do
    resources :families do
      resources :guest
      resources :messages
    end
    resources :photos
  end

  resources :families, only: [:show, :update] do
    resources :guests, only: [:show, :update]
    resources :messages, only: [:create, :show, :update]
  end
  resources :photos
end
