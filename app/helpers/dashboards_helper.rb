module DashboardsHelper
  def percentage(part, total)
    if total.zero?
      0
    else
     part.to_f / total.to_f * 100
    end
  end
end
