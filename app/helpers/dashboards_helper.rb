module DashboardsHelper
  def percentage(part, total)
    part.to_f / total.to_f * 100
  end
end
