puts '🌱 Seeding..... 🌱'

puts 'Creating users...'
p1 =
  User.create(
    username: 'NoahR',
    password: '1234',
    first_name: 'Noah',
    last_name: 'Reece',
    email: 'noahfakeemail@gmail.com',
    phone: '(123) 456-7890'
  )
puts 'p1 is created as: ' + p1[:id].to_s

p2 =
  User.create(
    username: 'Worderbot',
    first_name: 'Bot',
    last_name: 'Buddy',
    password: '1234',
    email: 'botbot@worderby.com',
    is_bot: true
  )
puts 'p2 is created as: ' + p2[:id].to_s
p3 =
  User.create(
    username: 'ChettT',
    password: '1234',
    first_name: 'Chett',
    last_name: 'Tiller',
    email: 'notchettemail@gmail.com',
    phone: '(098) 765-4321'
  )
p4 =
  User.create(
    username: 'CalebH',
    password: '1234',
    first_name: 'Caleb',
    last_name: 'Hamernick',
    email: 'notcalebemail@gmail.com',
    phone: '(111) 111-1111'
  )
p5 =
  User.create(
    username: 'JasmineE',
    password: '1234',
    first_name: 'Jasmine',
    last_name: 'Elkins',
    email: 'notjasemail@gmail.com',
    phone: '(222) 222-2222'
  )

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
    is_single_player: true,
    challenger: p1,
    challengee: p2,
    is_accepted: true
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
    is_single_player: false,
    challenger: p1,
    challengee: p3,
    is_accepted: false
  )

puts 'Creating prompts...'
rand_word_1 = Randword.get_random_word
rand_word_2 = Randword.get_random_word
prompt1 = Word.create(game: game1, text: rand_word_1, is_first_word: true)
prompt2 = Word.create(game: game2, text: rand_word_2, is_first_word: true)

puts '🌱 ..... All Done Seeding! 🌱'
