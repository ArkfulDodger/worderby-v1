puts '🌱 Seeding..... 🌱'

puts 'Creating users...'
p1 = User.create(name: 'Noah R')
p2 = User.create(name: 'Worderbot')

puts 'Creating game...'
game =
  Game.create(
    player1: p1,
    player2: p2,
    is_over: false,
    num_rounds: 3,
    round: 1,
    turn: 1,
    player1_score: 0,
    player2_score: 0,
    is_single_player: true
  )

puts 'Creating prompt...'
prompt = Word.create(game: game, text: 'begin', is_first_word: true)

puts '🌱 ..... All Done Seeding! 🌱'
