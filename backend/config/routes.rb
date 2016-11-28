Rails.application.routes.draw do
	post '/users/password_reset', to: 'users#reset_password'
	get '/users/password_reset', to: 'users#valid_password_token'


  resources :events
  resources :users
  resources :companies
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
