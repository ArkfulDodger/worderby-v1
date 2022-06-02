require 'uri'
require 'net/http'
require 'json'

class WordsController < ApplicationController
  # POST /words
  def create
    new_word = Word.create!(word_params)
    game = new_word.game
    game.score(new_word.score, new_word.time_penalty || 0)

    # byebug

    game.update(worderbyte: game.worderbyte + new_word.text[new_word.p_num..-1])

    # add to restricted endings only if more than one letter
    if new_word.p_num > 1
      game.update(
        restricted_endings:
          game.restricted_endings.push(new_word.text[0...new_word.p_num])
      )
    end
    if (game.round == game.num_rounds && game.turn == 2) ||
         game.is_single_player
      game.progress
    end

    render json: game, status: :created
  end

  def bot
    puts 'beep beep... playing the game'
    prompt = word_params[:prompt_text]
    max_p_num = get_max_p_num(prompt, prompt.length - 1)
    puts 'BOT: max p_num is ' + max_p_num.to_s
    target_p_num = rand(1..max_p_num)
    puts 'BOT: my target p_num is ' + target_p_num.to_s

    bot_word = get_bot_word(prompt, target_p_num)
    puts 'BOT: Word coming right up!'

    score =
      (bot_word[:p_num] * 10) + (bot_word[:text].length - bot_word[:p_num])

    new_word =
      Word.create!(
        word_params.merge(
          text: bot_word[:text],
          p_num: bot_word[:p_num],
          score: score
        )
      )
    game = new_word.game
    game.score(new_word.score)
    game.update(worderbyte: game.worderbyte + new_word.text[new_word.p_num..-1])

    # add to restricted endings only if more than one letter
    if new_word.p_num > 1
      game.update(
        restricted_endings:
          game.restricted_endings.push(new_word.text[0...new_word.p_num])
      )
    end

    game.progress if game.round == game.num_rounds && game.turn == 2

    render json: game, status: :created
  end

  private

  # permissible params to be used by create/update
  def word_params
    params.permit(
      :game_id,
      :round_played,
      :turn_played,
      :user_id,
      :text,
      :prompt_text,
      :p_num,
      :score,
      :is_first_word,
      :time_penalty
    )
  end

  def get_max_p_num(prompt, p_num)
    if Scraper.get_playable_words(prompt.last(p_num)).keys.count > 0
      p_num
    else
      get_max_p_num(prompt, p_num - 1)
    end
  end

  def is_word_entry?(data)
    !!data[0]['meta']
  end

  def is_word_in_stems?(data, word)
    data[0]['meta']['stems'].any? { |s| s.casecmp(word) == 0 }
  end

  def is_word_playable?(word)
    #confirm word is in dictionary
    uri =
      URI(
        "https://www.dictionaryapi.com/api/v3/references/collegiate/json/#{word}?key=a2d218bc-85bb-481b-aa42-1f04c84aa4a8"
      )
    res = Net::HTTP.get_response(uri)
    if res.is_a?(Net::HTTPSuccess)
      data = JSON.parse(res.body)

      is_word_entry?(data) && is_word_in_stems?(data, word)
    else
      return false
    end
  end

  def choose_word_of_length(pw, num, p_num)
    # retrieve random word of length
    word_i = rand(0...pw[num].count)
    word = pw[num][word_i]
    puts 'BOT: Attempting to play ' + word[:word] + '...'

    if is_word_playable?(word[:word])
      return wordObj = { p_num: p_num, text: word[:word] }
    else
      puts 'BOT: ' + word[:word] + ' is not in the dictionary'
      pw[num].delete_at(word_i)
      if pw[num].count > 0
        choose_word_of_length(pw, num, p_num)
      else
        return nil
      end
    end
  end

  def get_word_by_length(pw, p_num, prompt)
    # if there are valid words
    if pw.keys.count > 0
      # randomly determine word length from available
      target = rand(0...pw.keys.count)
      num = pw.keys[target]
      puts ('BOT: my target word length is ' + num.to_s)

      word = choose_word_of_length(pw, num, p_num)
      if word
        return word
      else
        puts 'BOT: no words at this length...'
        pw.delete(num)
        get_word_by_length(pw, p_num, prompt)
      end
    else
      puts 'BOT: no words at p_num ' + p_num.to_s + '. Checking p_num ' +
             (p_num - 1).to_s
      get_bot_word(prompt, p_num - 1)
    end
  end

  def get_bot_word(prompt, p_num)
    # get scraper results for prompt substring being tested
    pw = Scraper.get_playable_words(prompt.last(p_num))

    get_word_by_length(pw, p_num, prompt)
  end
end
