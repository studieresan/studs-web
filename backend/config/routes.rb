Rails.application.routes.draw do

  get '/users/me', to: 'users#me', as: 'me'
  get '/users/password_reset', to: 'users#reset_password'
  patch '/users/password_reset', to: 'users#update_by_token'
  resources :users do
    get '/resume', to: 'resume#show'
    patch '/resume', to: 'resume#update'
  end
  resources :users

  resources :events
  resources :companies

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
