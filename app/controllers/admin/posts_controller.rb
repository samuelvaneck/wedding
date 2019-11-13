class Admin::PostsController < AdminController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
    @posts.where!("comment ILIKE ?", "%#{params[:search]}%") if params[:search]
    @posts = @posts.order(created_at: :asc).page(params[:page]).per_page(20)
    @target = params[:target]
    @items = @posts
  end

  def show
    respond_with :admin, @post
  end

  def new
    @item = Post.new
  end

  def create
    @post = Post.create(post_params)
    respond_with :admin, @post
  end

  def edit
    respond_with @post
  end

  def update
    @post.update(post_params)
    respond_with :admin, @post
  end

  def destroy
    @post.destroy
    redirect_to admin_posts_path
  end

  private

  def post_params
    params.require(:post).permit :comment, :photo
  end

  def set_post
    @post = Post.find params[:id]
    @item = @post
  end
end
