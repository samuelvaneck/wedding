# frozen_string_literal: true

class FamiliesController < ApplicationController
  before_action :set_family, only: [:update]

  def index; end

  def update
    @family.response = true
    success = @family.update(family_params)
    @card_id = success ? "card-success" : "card-error"
    @guests = @family.guests
    @message = @family.message || Message.new
    render 'flip_card'
  end

  def flip_card
    @card_id = params[:card_id]
    @family = Family.find_by(uuid: params[:uuid]) if params[:uuid]
    if @family
      @guests = @family.guests
      @message = @family.message || Message.new
    else 
      return head(:not_found)
    end
  end

  private

  def family_params
    params.require(:family).permit(:response, :photo, guests_attributes: %i[id attending], message_attributes: %i[content id])
  end

  def set_family
    @family = Family.find params[:id]
  end
end
