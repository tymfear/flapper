json.(post,  :id, :title, :link, :user)
json.comments post.comments, partial: 'comments/single', as: :comment
json.votes post.votes.count
