Rails.application.routes.draw do
  devise_for :users

  root to: "admin/families#index"

  namespace :admin do
    resources :families do
      collection { post :import }
    end
    resources :guests
    resources :messages
    resources :posts
  end

  resources :families, only: [:show, :update] do
    resources :guests, only: [:show, :update]
    resources :messages, only: [:create, :show, :update]
  end
  resources :posts
end
