class Profile < ApplicationRecord
  has_many :skills, inverse_of: :profile, dependent: :destroy
  accepts_nested_attributes_for :skills, allow_destroy: true
end
