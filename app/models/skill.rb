class Skill < ApplicationRecord
  belongs_to :profile, inverse_of: :skills
end
