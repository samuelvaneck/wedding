Rails.application.routes.draw do
  devise_for :users

  namespace :admin do
    resources :families
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
