module BootstrapPaginationHelper
  class LinkRenderer < WillPaginate::ActionView::LinkRenderer
  protected
    def html_container(html)
      tag(:ul, html, class: 'pagination justify-content-center')
    end

    def previous_or_next_page(page, text, _classname)
      if page
        tag(:li, link(text, page, class: 'page-link'), class: 'page-item')
      else
        tag(:li, tag(:a, text, class: 'page-link'), class: 'page-item disabled')
      end
    end

    def page_number(page)
      if page == current_page
        tag(:li, tag(:a, page, class: 'page-link'), class: 'page-item active')
      else
        tag(:li, link(page, page, class: 'page-link'), class: 'page-item')
      end
    end

    def gap
      tag(:li, tag(:span, '&hellip;', class: 'pagination-ellipsis'), class: 'page-item')
    end
  end
  def bootstrap_will_paginate(collection = nil, options = {})
    options, collection = collection, nil if collection.is_a? Hash
    options = options.merge(renderer: BootstrapPaginationHelper::LinkRenderer)
    will_paginate(collection, options) rescue nil
  end
end
