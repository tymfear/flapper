class PostsController < ApplicationController
  before_action :set_post, only: [:show, :upvote]
  before_action :authenticate_user!, only: [:create, :upvote]

  def index
    @posts = Post.all.includes(:votes)
  end

  def create
    @post = Post.new(post_params.merge(user_id: current_user.id))

    render :show if @post.save
  end

  def show
  end

  def upvote
    @post.votes.create

    render :show
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

