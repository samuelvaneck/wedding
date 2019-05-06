module DashboardsHelper
  def percentage(part, total)
    total.zero? ? 0 : part.to_f / total.to_f * 100
  end
end
