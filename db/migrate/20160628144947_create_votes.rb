class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string  :votable_type
      t.integer :user_id
      t.integer :votable_id
      t.timestamps null: false
    end

    add_index :votes, [:votable_id, :user_id], unique: true
  end
end
