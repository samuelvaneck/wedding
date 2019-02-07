Rails.application.routes.draw do
  devise_for :users

  root to: "families#index"

  get "admin", to: "admin/families#index"

  namespace :admin do
    resources :families do
      collection { post :import }
      collection { get :qrcodes, defaults: { format: :pdf } }
    end
    resources :guests
    resources :messages
    resources :posts
  end

  resources :families, only: [:index, :update] do
    collection { get :flip_card }
    resources :guests, only: [:show, :update]
    resources :messages, only: [:create, :show, :update]
  end
  resources :posts
end
