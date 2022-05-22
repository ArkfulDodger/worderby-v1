Rails.application.routes.draw do
  # resources :users
  resources :words

  resources :games, only: %i[update]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/games/current', to: 'games#current'
end
