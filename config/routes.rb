Rails.application.routes.draw do
  # resources :users
  resources :words, only: %i[create]

  resources :games, only: %i[update create]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/games/current', to: 'games#current'
  post '/words/bot', to: 'words#bot'
end
