class Admin::PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]

  def index
    @photos = Photo.all
    @photos.where!("comment ILIKE ?", "%#{params[:search]}%") if params[:search]
    respond_with @photos
  end

  def show
    respond_with :admin, @photo
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new photo_params
    @photo.store params[:photo][:data]
    respond_with :admin, @photo
  end

  def edit
    respond_with @photo
  end

  def update
    @photo = Photo.update photo_params
    respond_with :admin, @photo
  end

  def destroy
    @photo.destroy
    redirect_to admin_photos_path
  end

  private

  def photo_params
    params.require(:photo).permit :url, :family_id, :comment
  end

  def set_photo
    @photo = Photo.find params[:id]
  end
end
