class Admin::FamiliesController < ApplicationController
  before_action :set_family, only: [:show, :edit, :update, :destory]
  def index
    @families = Family.all
    @families.where!("name ILIKE ? OR email ILIKE ?", "%#{params[:search]}%", "%#{params[:search]}%" ) if params[:search]
    @target = params[:target] if params[:target]
  end

  def show
    respond_with @family
  end

  def new
    @family = Family.new
    respond_with @family
  end

  def create
    @family = Family.create(family_params)
    respond_with @family
  end

  def edit
    respond_with @family
  end

  def updated
    @family.update(family_params)
    respond_with @family
  end

  def destroy
    @family.destroy
    redirect_to admin_families_path
  end

  private

  def family_params
    params.require(:family).permit(:email, :name, :response, :attendees)
  end
  def set_family
    @family = Family.find params[:id]
  end
end
