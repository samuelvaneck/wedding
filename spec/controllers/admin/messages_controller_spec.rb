require 'rails_helper'

describe Admin::MessagesController do
  let(:user) { FactoryBot.create :user }
  let(:family) { FactoryBot.create :family}
  let(:message) { FactoryBot.create :message, family: family }
  let(:messages) { FactoryBot.create_list :message, 3, family: family }

  before do
    sign_in user
  end

  describe 'GET #index' do
    before do
      messages
    end
    context 'without search params' do
      it 'is expected to assign message as @messages' do
        get :index
        expect(assigns(:messages).order(created_at: :asc)).to eq messages
      end

      it 'is exptected to render the index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'with search params' do
      before do
        message
      end
      it 'is expected to assign the looked up message as @message' do
        get :index, params: { search: message.content, target: 'messages-table' }
        expect(assigns(:messages)).to eq [message]
      end
      it 'is expected to assign target when the target params is present' do
        get :index, params: { search: message.content, target: 'messages-table' }
        expect(assigns(:target)).to eq 'messages-table'
      end
    end
  end

  describe '#GET show' do
    context 'with valid id' do
      it 'is expected to assign message as @message' do
        get :show, params: { id: message.id }
        expect(assigns(:message)).to eq message
      end

      it 'is expected to render the show template' do
        get :show, params: { id: message.id }
        expect(response).to render_template :show
      end
    end
  end

  describe '#GET new' do
    it 'is expected to assign @message' do
      get :new
      expect(assigns(:message)).to be_a_new Message
    end
    it 'is expected to render the new template' do
      get :new
      expect(response).to render_template :new
    end
  end

  describe '#POST create' do
    context 'with valid params' do
      it 'creates a new message' do
        expect {
          post :create, params: { family_id: family.id, message: FactoryBot.attributes_for(:message, family_id: family.id) }
        }.to change(Message, :count).by(1)
      end
      it 'is expected that the new message is persiated' do
        post :create, params: { family_id: family.id, message: FactoryBot.attributes_for(:message , family_id: family.id) }
        expect(assigns(:message)).to be_persisted
      end
      it 'is expected to redirect to the show page' do
        post :create, params: { family_id: family.id, message: FactoryBot.attributes_for(:message , family_id: family.id) }
        expect(response).to redirect_to '/admin/messages/' + Message.last.id.to_s
      end
    end

    context 'with invalid params' do
      it 'is expected to NOT save the message in the database' do
        expect {
          post :create, params: { family_id: family.id, message: { name: 'test', family_id: '' } }
        }.to change(Message, :count).by(0)
      end

      it 'is expected to render the new template' do
        post :create, params: { family_id: family.id, message: { name: 'test', family_id: '' } }
        expect(response).to render_template :new
      end
    end
  end

  describe '#GET edit' do
    it 'is expected to assign the requested message as @message' do
      get :edit, params: { id: message.id }
      expect(assigns(:message)).to eq message
    end

    it 'is expected to render the edit template' do
      get :edit, params: { id: message.id }
      expect(response).to render_template :edit
    end
  end

  describe '#PUT update' do
    context 'with valid params' do
      before do
        put :update, params: { family_id: family.id, id: message.id, message: { content: 'Test update', family_id: family.id } }
        message.reload
      end
      it 'is expected to update the attribute with the new value' do
        expect(message.content).to eq 'Test update'
      end
      it 'is expected to redirect to the message show page' do
        expect(response).to redirect_to '/admin/messages/' + Message.last.id.to_s
      end
    end

    context 'with invalid params' do
      before do
        put :update, params: { family_id: family.id, id: message.id, message: { content: 'test', family_id: '' } }
        message.reload
      end
      it 'is expected to NOT save the new value to the database' do
        expect(message.content).to_not eq 'Test update'
      end
      it 'is expected to render the edit template' do
        expect(response).to render_template :edit
      end
    end
  end

  describe '#DELETE destroy' do
    before do
      message
    end
    it 'is expected to assign message as @message' do
      delete :destroy, params: { id: message.id }
      expect(assigns(:message)).to eq message
    end
    it 'is expected to delete the message from the database' do
      expect {
        delete :destroy, params: { id: message.id }
      }.to change(Message, :count).by(-1)
    end
    it 'is expected to redirect to the messages index page' do
      delete :destroy, params: { id: message.id }
      expect(response).to redirect_to '/admin/messages'
    end
  end
end
