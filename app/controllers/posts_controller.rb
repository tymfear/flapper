class PostsController < ApplicationController
  before_action :set_post, only: [:show, :upvote]
  before_action :authenticate_user!, only: [:create, :upvote]

  def index
    @posts = Post.all.includes(:votes)
  end

  def create
    @post = Post.new(post_params.merge(user_id: current_user.id))

    if @post.save
      @notice = 'Post created successfully'
      render :show
    else
      render json: {error: 'Failed to create this post'}, status: :unprocessable_entity
    end
  end

  def show
  end

  def upvote
    vote = @post.votes.new user: current_user
    if vote.save
      render json: {notice: 'Voted successfully'}, status: :ok
    else
      render json: {error: 'You cannot vote for this post'}, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find params[:id]
  end

  def post_params
    params.require(:post).permit(:link, :title)
  end

  def as_json(options = {})
    super(options.merge(include: [:user, comments: {include: :user}]))
  end
end

