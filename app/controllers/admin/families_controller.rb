class Admin::FamiliesController < AdminController
  before_action :set_family, only: [:show, :edit, :update, :destroy]
  def index
    @families = Family.all
    @families.where!("name ILIKE ? OR email ILIKE ?", "%#{params[:search]}%", "%#{params[:search]}%") if params[:search]
    @target = params[:target] if params[:target]
  end

  def show
    respond_with :admin, @family
  end

  def new
    @family = Family.new
    @item = @family
  end

  def create
    params[:family][:uuid] = SecureRandom.hex 3
    @family = Family.create family_params
    respond_with :admin, @family
  end

  def edit
    @item = @family
    respond_with @family
  end

  def update
    @family.update family_params
    respond_with :admin, @family
  end

  def destroy
    @family.destroy
    redirect_to admin_families_path
  end

  def import
    file = params[:file]
    imported = Family.import file
    redirect_to admin_families_path
  end

  private

  def family_params
    params.require(:family).permit(:email, :name, :response, :attendees, :photo, :uuid, guests_attributes: [:attending, :id], message_attributes: [:content, :id])
  end

  def set_family
    @family = Family.find params[:id]
  end
end
