class Admin::GuestsController < ApplicationController
  before_action :set_guest, only: [:show, :edit, :update, :destroy]

  def index
    @guests = Guest.all
    @guests.where!("name ILIKE ?", "%#{params[:search]}%") if params[:search]
    @target = params[:target] if params[:target]
  end

  def show
    respond_with @guest
  end

  def new
    @guest = Guest.new
  end

  def create
    @guest = Guest.create(guest_params)
    respond_with @guest
  end

  def edit
    respond_with @guest
  end

  def updated
    @guest.update(guest_params)
    respond_with @guest
  end

  def destroy
    @guest.destroy
  end

  private
  def guest_params
    params.require(:guest).permit(:name, :atteding, :day_guest)
  end
  def set_guest
    @guest = Guest.find params[:id]
  end
end
