require 'nokogiri'
require 'open-uri'
require 'pry'

class Scraper
  @@scrape_url = 'https://www.thefreedictionary.com/words-that-start-with-'

  def self.get_playable_words(prompt)
    words_list = {}
    webpage = get_webpage(prompt)

    if webpage
      get_word_divs(webpage).each do |div|
        if contains_playable_word?(div, prompt)
          add_words_to_list(div, prompt, words_list)
        end
      end
    end

    words_list
  end

  private

  def self.get_webpage(prompt)
    begin
      Nokogiri.HTML(URI.open(@@scrape_url + prompt))
    rescue OpenURI::HTTPError => ex
      nil
    end
  end

  def self.get_word_divs(webpage)
    webpage.css('#dCont .TCont').first.children
  end

  def self.get_word_lis(div)
    div.css('li')
  end

  def self.playable?(item)
    item.attributes['data-f'].value.to_i.odd?
  end

  def self.get_text(li)
    li.css('b').first.next.text
  end

  def self.is_prompt_length?(div, prompt)
    get_letter_count(div) <= prompt.length
  end

  def self.word_obj(li, prompt)
    { text: get_text(li), word: prompt + get_text(li) }
  end

  def self.add_words_to_list(div, prompt, words_list)
    words = []

    get_word_lis(div).each do |li|
      words.push(word_obj(li, prompt)) if playable?(li)
    end

    words_list[get_letter_count(div)] = words
  end

  def self.contains_playable_word?(div, prompt)
    playable?(div) && !is_prompt_length?(div, prompt)
  end

  def self.get_letter_count(div)
    div.attributes['id'].value[1..-1].to_i
  end
end
