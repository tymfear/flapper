class CommentsController < ApplicationController
  before_action :set_post
  before_action :authenticate_user!, only: [:create, :upvote]

  def create
    @comment = @post.comments.create comment_params.merge(user_id: current_user.id)
    render :show
  end

  def show
  end

  def upvote
    @comment = @post.comments.find(params[:id])
    @comment.votes.create

    render :show
  end

  private
  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
