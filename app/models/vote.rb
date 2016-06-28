class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :votable, polymorphic: true

  validates :user_id, uniqueness: {scope: :votable_id}
  validates :votable_id, presence: true
end
