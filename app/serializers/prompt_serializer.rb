class PromptSerializer < ActiveModel::Serializer
  attributes :id, :text, :p_num, :score, :is_first_word
end
