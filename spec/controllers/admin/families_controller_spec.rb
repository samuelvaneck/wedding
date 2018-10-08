require 'rails_helper'

describe Admin::FamiliesController do
  let(:user) { FactoryBot.create :user }
  let(:family) { FactoryBot.create :family, :with_guests }
  let(:families) { FactoryBot.create_list :family, 3, :with_guests }

  before do
    sign_in user
  end

  describe "GET #index" do
    before do
      families
    end
    context "without search params" do
      it "is expected to assign families as @families" do
        get :index
        expect(assigns(:families).order(created_at: :asc)).to eq families
      end

      it "is exptected to render the index template" do
        get :index
        expect(response).to render_template :index
      end
    end

    context "with search params" do
      before do
        family
      end
      it "is expected to assign the looked up family as @family" do
        get :index, params: { search: family.name, target: "families-table" }
        expect(assigns(:families)).to eq [family]
      end
      it "is expected to assign target when the target params is present" do
        get :index, params: { search: family.name, target: "families-table" }
        expect(assigns(:target)).to eq "families-table"
      end
    end
  end

  describe "#GET show" do
    context "with valid id" do
      it "is expected to assign family as @family" do
        get :show, params: { id: family.id }
        expect(assigns(:family)).to eq family
      end

      it "is expected to render the show template" do
        get :show, params: { id: family.id }
        expect(response).to render_template :show
      end
    end
  end

  describe "#GET new" do
    it "is expected to assign @family" do
      get :new
      expect(assigns(:family)).to be_a_new Family
    end
    it "is expected to render the new template" do
      get :new
      expect(response).to render_template :new
    end
  end

  describe "#POST create" do
    context "with valid params" do
      it "creates a new family" do
        expect {
          post :create, params: { family: FactoryBot.attributes_for(:family) }
        }.to change(Family, :count).by(1)
      end
      it "is expected that the new family is persiated" do
        post :create, params: { family: FactoryBot.attributes_for(:family) }
        expect(assigns(:family)).to be_persisted
      end
      it "is expected to redirect to the show page" do
        post :create, params: { family: FactoryBot.attributes_for(:family) }
        expect(response).to redirect_to '/admin/families/' + Family.last.id.to_s
      end
    end

    context "with invalid params" do
      it "is expected to NOT save the family in the database" do
        expect {
          post :create, params: { family: { name: "", email: "test@email.com" } }
        }.to change(Family, :count).by(0)
      end

      it "is expected to render the new template" do
        post :create, params: { family: { name: "", email: "test@email.com" } }
        expect(response).to render_template :new
      end
    end
  end

  describe "#GET edit" do
    it "is expected to assign the requested family as @family" do
      get :edit, params: { id: family.id }
      expect(assigns(:family)).to eq family
    end

    it "is expected to render the edit template" do
      get :edit, params: { id: family.id }
      expect(response).to render_template :edit
    end
  end

  describe "#POST update" do
    context "with valid params" do
      before do
        post :update, params: { id: family.id, family: { name: "Test update" } }
        family.reload
      end
      it "is expected to update the attribute with the new value" do
        expect(family.name).to eq "Test update"
      end
      it "is expected to redirect to the family show page" do
        expect(response).to redirect_to "/admin/families/" + family.id.to_s
      end
    end

    context "with invalid params" do
      before do
        post :update, params: { id: family.id, family: { name: "" } }
        family.reload
      end
      it "is expected to NOT save the new value to the database" do
        expect(family.name).to_not eq "Test update"
      end
      it "is expected to render the edit template" do
        expect(response).to render_template :new
      end
    end
  end

  describe "#DELETE destroy" do
    before do
      family
    end
    it "is expected to assign family as @family" do
      delete :destroy, params: { id: family.id }
      expect(assigns(:family)).to eq family
    end
    it "is expected to delete the family from the database" do
      expect {
        delete :destroy, params: { id: family.id }
      }.to change(Family, :count).by(-1)
    end
    it "is expected to redirect to the families index page" do
      delete :destroy, params: { id: family.id }
      expect(response).to redirect_to '/admin/families'
    end
  end
end
