source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.4"

gem 'awesome_print'
gem 'pry'
gem 'nokogiri'
gem 'open-uri'

gem 'redis', '~> 4.6.0'

# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'
# gem 'knock', '~> 2.1.1'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3"

# # Use sqlite3 as the database for Active Record
# gem "sqlite3", "~> 1.4"

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :development, :test do
  gem 'rspec-rails', '~> 5.0.0'
end

group :test do
  gem 'rspec-json_expectations'
  gem 'shoulda-matchers', '~> 4.0'
end

gem "active_model_serializers", "~> 0.10.12"

