import * as React from 'react'
import { mount } from '../../application/mount'
import { HeaderContent } from './header/HeaderContent'

interface familyHeaderProps {
  couple_names: string
  wedding_date: string
}

export class FamilyHeader extends React.Component<familyHeaderProps> {

  render() {
    return (
      <React.Fragment>
        <div className="family-header d-flex flex-row">
          <div className="header-img"></div>
          <div className="header-content">
            <div className="overlay"></div>
            <div className="d-flex-flex-nowrap">
              <div className="mt-3">
                <div className="d-flex content-text flex-column parisienne">
                  <HeaderContent coupleNames={this.props.couple_names} weddingDate={this.props.wedding_date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

mount(FamilyHeader, 'family-header')
