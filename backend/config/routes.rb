Rails.application.routes.draw do

  get '/users/me', to: 'users#me', as: 'me'
  get '/users/password-reset', to: 'users#reset_password'
  patch '/users/password-reset', to: 'users#update_by_token'
  get '/users/missing_before_forms', to: 'users#missing_before_forms'
  get '/users/missing_after_forms', to: 'users#missing_after_forms'
  resources :users do
    get '/resume', to: 'resumes#show'
    patch '/resume', to: 'resumes#update'
  end

  resources :users

  resources :events
  resources :companies
  get '/user_event_forms/mine', to: 'user_event_forms#mine'
  resources :user_event_forms

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
