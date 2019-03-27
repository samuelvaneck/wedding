class Admin::DashboardsController < AdminController

  def index
    @responded = Family.responded
    @awaiting_respone = Family.not_responded
    @family_guests_present = Family.joins(:guests).where("guests.attending = ?", true).uniq
    @family_guests_absent = Family.joins(:guests).where("guests.attending is null OR guests.attending = ?", false).uniq
    @messages = Message.all
  end
end
