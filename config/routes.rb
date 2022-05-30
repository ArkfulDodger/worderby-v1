Rails.application.routes.draw do
  # resources :messages, only: %i[index create]
  # resources :channels
  mount ActionCable.server => '/cable'
  resources :users, only: %i[index]
  resources :words, only: %i[create]

  resources :games

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#auth'
  get '/games/current', to: 'games#current'
  post '/words/bot', to: 'words#bot'
end
