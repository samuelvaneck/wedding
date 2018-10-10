require 'rails_helper'

describe FamiliesController do
  let(:user) { FactoryBot.create :user }
  let(:family) { FactoryBot.create :family, :with_guests_and_message }
  let(:family_only_guests) { FactoryBot.create :family, :with_guests }
  let(:families) { FactoryBot.create_list :family, 3, :with_guests }

  before do
    sign_in user
  end

  describe 'GET #index' do
    before do
      families
    end
    context 'without uuid params' do
      before do
        get :index
      end
      it 'is expected NOT to assign families' do
        expect(assigns(:families)).to eq nil
      end

      it 'is expected NOT to assign guests' do
        expect(assigns(:guests)).to eq nil
      end

      it 'is expected NOT to assign message' do
        expect(assigns(:message)).to eq nil
      end

      it 'is exptected to render the index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'with uuid params' do
      before do
        get :index, params: { uuid: family.uuid }
      end
      it 'is expected to assign families' do
        expect(assigns(:family)).to eq family
      end

      it 'is expected to assign guests' do
        expect(assigns(:guests).order(id: :asc)).to eq family.guests.order(id: :asc)
      end

      it 'is expected to assign message' do
        expect(assigns(:message)).to eq family.message
      end

      it 'is exptected to render the index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'with no message' do
      before do
        get :index, params: { uuid: family_only_guests.uuid }
      end
      it 'is expected to assign message as a new Message' do
        expect(assigns(:message)).to be_a_new Message
      end

      it 'is expected to render the index template' do
        expect(response).to render_template :index
      end
    end
  end

  describe '#PUT update' do
    context 'with valid params' do
      before do
        put :update, params: { id: family.id, family: { guests_attributes: { '0' => { attending: true } } } }
        family.reload
      end
      it 'is expected to update the attribute with the new value' do
        expect(family.guests.first.attending).to eq true
      end
      it 'is expected to redirect to the family show page' do
        expect(response.status).to eq 204
      end
    end

    context 'with invalid params' do
      before do
        put :update, params: { id: family.id, family: { name: '' } }
        family.reload
      end
      it 'is expected to NOT save the new value to the database' do
        expect(family.name).to_not eq 'Test update'
      end
      it 'is expected to render the edit template' do
        expect(response.status).to eq 204
      end
    end
  end
end
