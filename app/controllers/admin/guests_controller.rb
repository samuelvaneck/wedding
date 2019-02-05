class Admin::GuestsController < AdminController
  before_action :set_guest, only: [:show, :edit, :update, :destroy]

  def index
    @guests = Guest.all
    @guests.where!("name ILIKE ?", "%#{params[:search]}%") if params[:search]
    @target = params[:target] if params[:target]
    if params[:reverse]
      @guests = @guests.order("#{params[:order]} DESC").page(params[:page]).per_page(20)
    else
      @guests = @guests.order(params[:order]).page(params[:page]).per_page(20)
    end
  end

  def show
    respond_with :admin, @guest
  end

  def new
    @guest = Guest.new
  end

  def create
    @guest = Guest.create guest_params
    respond_with :admin, @guest
  end

  def edit
    respond_with @guest
  end

  def update
    @guest.update guest_params
    respond_with :admin, @guest
  end

  def destroy
    @guest.destroy
    redirect_to admin_guests_path
  end

  private
  def guest_params
    params.require(:guest).permit :name, :attending, :day_guest, :family_id
  end
  def set_guest
    @guest = Guest.find params[:id]
  end
end
