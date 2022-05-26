puts '🌱 Seeding..... 🌱'

puts 'Creating users...'
p1 = User.create(username: 'ArkfulDodger', password: '1234', first_name: 'Noah', last_name: 'Reece', email: 'noahfakeemail@gmail.com', phone: '(123) 456-7890')
p2 = User.create(username: 'Worderbot', password: '1234', is_bot: true)
p3 = User.create(username: 'brewchetta', password: '1234', first_name: 'Chett', last_name: 'Tiller', email: 'notchettemail@gmail.com', phone: '(098) 765-4321')

puts 'Creating games...'
game1 =
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
game2 =
  Game.create(
    player1: p3,
    player2: p1,
    is_over: false,
    num_rounds: 3,
    round: 1,
    turn: 1,
    player1_score: 0,
    player2_score: 0,
    is_single_player: false
  )

puts 'Creating prompts...'
rand_word_1 = Randword.get_random_word
rand_word_2 = Randword.get_random_word
prompt1 = Word.create(game: game1, text: rand_word_1, is_first_word: true)
prompt2 = Word.create(game: game2, text: rand_word_2, is_first_word: true)

puts '🌱 ..... All Done Seeding! 🌱'
