class Admin::DashboardsController < AdminController

  def index
    @responded = Family.responded
    @awaiting_respone = Family.not_responded
    @guests_present = Guest.is_attending
    @guests_absent = Guest.not_attending
    @messages = Message.all
  end
end
