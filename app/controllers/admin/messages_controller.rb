class Admin::MessagesController < AdminController
  before_action :set_message, only: [:show, :edit, :update, :destroy]

  def index
    @messages = Message.all
    @messages.where!("content ILIKE ?", "%#{params[:search]}%") if params[:search]
    @target = params[:target] if params[:target]
  end

  def show
    respond_with :admin, @message
  end

  def new
    @message = Message.new
    @item = @message
  end

  def create
    @message = Message.create message_params
    respond_with :admin, @message
  end

  def edit
    @item = @message
    respond_with @message
  end

  def update
    @message.update(message_params)
    respond_with :admin, @message
  end

  def destroy
    @message.destroy
    redirect_to admin_messages_path
  end

  private

  def message_params
    params.require(:message).permit :content, :family_id
  end

  def set_message
    @message = Message.find params[:id]
  end
end
