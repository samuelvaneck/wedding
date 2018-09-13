module FamiliesHelper
  def response_icon responded
    if responded
      tag.i class: "fas fa-check"
    else
      tag.i class: "fas fa-times"
    end
  end
end
