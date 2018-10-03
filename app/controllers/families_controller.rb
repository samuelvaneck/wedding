class FamiliesController < ApplicationController
  before_action :set_family, only: [:update]

  def index
    return unless params[:uuid]
    @family = Family.find_by(uuid: params[:uuid])
    return unless @family
    @guests = @family.guests
    @message = @family.message || Message.new
  end

  def update
    @family.response = true
    @family.update(family_params)
  end

  private

  def family_params
    params.require(:family).permit(:response, :photo, guests_attributes: [:id, :attending], message_attributes: [:content, :id])
  end

  def set_family
    @family = Family.find params[:id]
  end
end
