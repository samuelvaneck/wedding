module FamiliesHelper
  def boolean_icon(responded)
    if responded
      tag.i class: "fas fa-check"
    else
      tag.i class: "fas fa-times"
    end
  end

  def atteding_total_guests(family)
    attending = family.guests.map { |guest| true if guest.attending.present? }.compact.count
    return "#{attending} / #{family.guests.count}"
  end
end
