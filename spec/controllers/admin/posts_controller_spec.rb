require 'rails_helper'

describe Admin::PostsController do
  let(:user) { FactoryBot.create :user }
  let(:post_item) { FactoryBot.create :post }
  let(:posts) { FactoryBot.create_list :post, 3 }

  before do
    sign_in user
  end

  describe 'GET #index' do
    before do
      posts
    end
    context 'without search params' do
      it 'is expected to assign post as @posts' do
        get :index
        expect(assigns(:posts).order(created_at: :asc)).to eq posts
      end

      it 'is exptected to render the index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'with search params' do
      before do
        post_item
      end
      it 'is expected to assign the looked up post as @post' do
        get :index, params: { search: post_item.comment, target: 'posts-table' }
        expect(assigns(:posts)).to eq [post_item]
      end
      it 'is expected to assign target when the target params is present' do
        get :index, params: { search: post_item.comment, target: 'posts-table' }
        expect(assigns(:target)).to eq 'posts-table'
      end
    end
  end

  describe '#GET show' do
    context 'with valid id' do
      it 'is expected to assign post as @post' do
        get :show, params: { id: post_item.id }
        expect(assigns(:post)).to eq post_item
      end

      it 'is expected to render the show template' do
        get :show, params: { id: post_item.id }
        expect(response).to render_template :show
      end
    end
  end

  describe '#GET new' do
    it 'is expected to assign @post' do
      get :new
      expect(assigns(:item)).to be_a_new Post
    end
    it 'is expected to render the new template' do
      get :new
      expect(response).to render_template :new
    end
  end

  describe '#POST create' do
    context 'with valid params' do
      it 'creates a new post' do
        expect {
          post :create, params: { post: FactoryBot.attributes_for(:post) }
        }.to change(Post, :count).by(1)
      end
      it 'is expected that the new post is persiated' do
        post :create, params: { post: FactoryBot.attributes_for(:post) }
        expect(assigns(:post)).to be_persisted
      end
      it 'is expected to redirect to the show page' do
        post :create, params: { post: FactoryBot.attributes_for(:post) }
        expect(response).to redirect_to '/admin/posts/' + Post.last.id.to_s
      end
    end

    context 'with invalid params' do
      it 'is expected to NOT save the post in the database' do
        expect {
          post :create, params: { post: { comment: '' } }
        }.to change(Post, :count).by(0)
      end

      it 'is expected to render the new template' do
        post :create, params: { post: { comment: '' } }
        expect(response).to render_template :new
      end
    end
  end

  describe '#GET edit' do
    it 'is expected to assign the requested post as @post' do
      get :edit, params: { id: post_item.id }
      expect(assigns(:post)).to eq post_item
    end

    it 'is expected to render the edit template' do
      get :edit, params: { id: post_item.id }
      expect(response).to render_template :edit
    end
  end

  describe '#PUT update' do
    context 'with valid params' do
      before do
        put :update, params: { id: post_item.id, post: { comment: 'Test update' } }
        post_item.reload
      end
      it 'is expected to update the attribute with the new value' do
        expect(post_item.comment).to eq 'Test update'
      end
      it 'is expected to redirect to the post show page' do
        expect(response).to redirect_to '/admin/posts/' + Post.last.id.to_s
      end
    end

    context 'with invalid params' do
      before do
        put :update, params: { id: post_item.id, post: { comment: '' } }
        post_item.reload
      end
      it 'is expected to NOT save the new value to the database' do
        expect(post_item.comment).to_not eq 'Test update'
      end
      it 'is expected to render the edit template' do
        expect(response).to render_template :edit
      end
    end
  end

  describe '#DELETE destroy' do
    before do
      post_item
    end
    it 'is expected to assign post as @post' do
      delete :destroy, params: { id: post_item.id }
      expect(assigns(:post)).to eq post_item
    end
    it 'is expected to delete the post from the database' do
      expect {
        delete :destroy, params: { id: post_item.id }
      }.to change(Post, :count).by(-1)
    end
    it 'is expected to redirect to the posts index page' do
      delete :destroy, params: { id: post_item.id }
      expect(response).to redirect_to '/admin/posts'
    end
  end
end
