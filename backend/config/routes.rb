Rails.application.routes.draw do
  resources :events
  root to: 'application#home'

  get '/users/me', to: 'users#me', as: 'me'
  resources :users
  get '/users/me', to 'users#me', as: 'me'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
