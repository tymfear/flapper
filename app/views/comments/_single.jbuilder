json.(comment, :id, :body)
json.author comment.user.username
json.votes comment.votes.count
