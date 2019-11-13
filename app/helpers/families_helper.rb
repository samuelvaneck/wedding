module FamiliesHelper
  def boolean_icon(responded)
    if responded
      tag.i class: 'fas fa-check'
    else
      tag.i class: 'fas fa-times'
    end
  end

  def atteding_total_guests(family)
    attending = family.guests.map { |guest| true if guest.attending.present? }.compact.count
    "#{attending} / #{family.guests.count}"
  end

  def response_badge(family)
    badge_class = family.response ? 'badge badge-success' : 'badge badge-danger'
    badge_text = family.response ? 'responded' : 'no response'
    tag.span class: badge_class do
      badge_text
    end
  end

  def badge_code(family)
    tag.span family.uuid, class: 'badge badge-secondary', title: 'Wedding code'
  end

  def badge_attending(guest)
    badge_class = guest.attending ? 'badge badge-success' : 'badge badge-danger'
    tag.span class: badge_class do
      guest.attending || 'no response'
    end
  end
end
