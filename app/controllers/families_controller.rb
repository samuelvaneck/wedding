# frozen_string_literal: true

class FamiliesController < ApplicationController
  before_action :set_family, only: [:update]

  def index; end

  def update
    success = @family.update! family_params
    render json: { success: success }
  end

  def login
    @family = Family.find_by(uuid: params[:uuid]) if params[:uuid]
    return head(:not_found) unless @family

    render json: @family, include: %i[guests message]
  end

  private

  def family_params
    params.require(:family).permit(
      :response,
      :photo,
      :allergies,
      guests_attributes: %i[id attending],
      message_attributes: %i[content id]
    )
  end

  def set_family
    @family = Family.find params[:id]
  end
end
