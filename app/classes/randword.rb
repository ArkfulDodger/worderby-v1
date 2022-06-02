require 'uri'
require 'net/http'
require 'json'

class Randword
  def self.get_random_word
    puts 'boop beep, getting a word...'
    uri = URI('https://random-words-api.vercel.app/word')
    res = Net::HTTP.get_response(uri)
    if res.is_a?(Net::HTTPSuccess)
      word = JSON.parse(res.body)[0]['word'].downcase

      puts 'beep boop, found ' + word + '...'
      if is_word_playable?(word)
        puts 'boop beep, I can play it!'
        return word
      else
        puts "boop beep, well that won't work..."
        self.get_random_word
      end
    else
      puts 'beep boop bzzzzt... malfunction'
      return 'error'
    end
  end

  private

  def self.is_word_entry?(data)
    data.length > 0 && !!data[0]['meta']
  end

  def self.is_word_in_stems?(data, word)
    data[0]['meta']['stems'].include?(word)
  end

  def self.is_word_playable?(word)
    if word =~ /[^a-z]/
      puts 'boop bop... found non-standard character'
      return false
    end

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
end
