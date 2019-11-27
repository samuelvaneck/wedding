Rails.application.routes.draw do
  devise_for :users

  root to: 'families#index'

  get 'admin', to: 'admin/dashboards#index'
  get 'admin/dashboard', to: 'admin/dashboards#index'

  namespace :admin do
    resources :families do
      collection { post :import }
      collection { get :qrcodes, defaults: { format: :pdf } }
    end
    resources :guests
    resources :messages
    resources :posts
  end

  resources :families, only: %i[index update] do
    collection { get :login }
    resources :guests, only: %i[show update]
    resources :messages, only: %i[create show update]
  end
  resources :posts
end
