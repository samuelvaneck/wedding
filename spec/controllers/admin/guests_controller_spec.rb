require 'rails_helper'

describe Admin::GuestsController do
  let(:user) { FactoryBot.create :user }
  let(:family) { FactoryBot.create :family}
  let(:guest) { FactoryBot.create :guest, family: family }
  let(:guests) { FactoryBot.create_list :guest, 3, family: family }

  before do
    sign_in user
  end

  describe 'GET #index' do
    before do
      guests
    end
    context 'without search params' do
      it 'is expected to assign guest as @guests' do
        get :index
        expect(assigns(:guests).order(created_at: :asc)).to eq guests
      end

      it 'is exptected to render the index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'with search params' do
      before do
        guest
      end
      it 'is expected to assign the looked up guest as @guest' do
        get :index, params: { search: guest.name, target: 'guests-table' }
        expect(assigns(:guests)).to eq [guest]
      end
      it 'is expected to assign target when the target params is present' do
        get :index, params: { search: guest.name, target: 'guests-table' }
        expect(assigns(:target)).to eq 'guests-table'
      end
    end
  end

  describe '#GET show' do
    context 'with valid id' do
      it 'is expected to assign guest as @guest' do
        get :show, params: { id: guest.id }
        expect(assigns(:guest)).to eq guest
      end

      it 'is expected to render the show template' do
        get :show, params: { id: guest.id }
        expect(response).to render_template :show
      end
    end
  end

  describe '#GET new' do
    it 'is expected to assign @guest' do
      get :new
      expect(assigns(:guest)).to be_a_new Guest
    end
    it 'is expected to render the new template' do
      get :new
      expect(response).to render_template :new
    end
  end

  describe '#POST create' do
    context 'with valid params' do
      it 'creates a new guest' do
        expect {
          post :create, params: { family_id: family.id, guest: FactoryBot.attributes_for(:guest, family_id: family.id) }
        }.to change(Guest, :count).by(1)
      end
      it 'is expected that the new guest is persiated' do
        post :create, params: { family_id: family.id, guest: FactoryBot.attributes_for(:guest , family_id: family.id) }
        expect(assigns(:guest)).to be_persisted
      end
      it 'is expected to redirect to the show page' do
        post :create, params: { family_id: family.id, guest: FactoryBot.attributes_for(:guest , family_id: family.id) }
        expect(response).to redirect_to '/admin/guests/' + Guest.last.id.to_s
      end
    end

    context 'with invalid params' do
      it 'is expected to NOT save the guest in the database' do
        expect {
          post :create, params: { family_id: family.id, guest: { name: '', family_id: family.id } }
        }.to change(Guest, :count).by(0)
      end

      it 'is expected to render the new template' do
        post :create, params: { family_id: family.id, guest: { name: '', family_id: family.id } }
        expect(response).to render_template :new
      end
    end
  end

  describe '#GET edit' do
    it 'is expected to assign the requested guest as @guest' do
      get :edit, params: { id: guest.id }
      expect(assigns(:guest)).to eq guest
    end

    it 'is expected to render the edit template' do
      get :edit, params: { id: guest.id }
      expect(response).to render_template :edit
    end
  end

  describe '#PUT update' do
    context 'with valid params' do
      before do
        put :update, params: { family_id: family.id, id: guest.id, guest: { name: 'Test update', family_id: family.id } }
        guest.reload
      end
      it 'is expected to update the attribute with the new value' do
        expect(guest.name).to eq 'Test update'
      end
      it 'is expected to redirect to the guest show page' do
        expect(response).to redirect_to '/admin/guests/' + Guest.last.id.to_s
      end
    end

    context 'with invalid params' do
      before do
        put :update, params: { family_id: family.id, id: guest.id, guest: { name: '', family_id: family.id } }
        guest.reload
      end
      it 'is expected to NOT save the new value to the database' do
        expect(guest.name).to_not eq 'Test update'
      end
      it 'is expected to render the edit template' do
        expect(response).to render_template :edit
      end
    end
  end

  describe '#DELETE destroy' do
    before do
      guest
    end
    it 'is expected to assign guest as @guest' do
      delete :destroy, params: { id: guest.id }
      expect(assigns(:guest)).to eq guest
    end
    it 'is expected to delete the guest from the database' do
      expect {
        delete :destroy, params: { id: guest.id }
      }.to change(Guest, :count).by(-1)
    end
    it 'is expected to redirect to the guests index page' do
      delete :destroy, params: { id: guest.id }
      expect(response).to redirect_to '/admin/guests'
    end
  end
end
