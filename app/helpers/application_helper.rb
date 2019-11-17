module ApplicationHelper
  def react_component(name, props = nil)
    tag.div id: name, data: { react_props: props }
  end
end
