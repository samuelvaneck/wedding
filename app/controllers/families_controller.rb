class FamiliesController < ApplicationController
  before_action :set_family, only: [:index, :update]
  
  def index
    @guests = @family.guests
  end

  def update
    @family.update(family_params)
  end

  private

  def family_params
    params.require(:family).permit :response, :photo, guest_attributes: [:attending], message_attributes: [:content]
  end

  def set_family
    @family = Family.find_by(email: params[:email])
  end
end
