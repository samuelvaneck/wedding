import * as React from 'react'
import { mount } from '../../application/mount'

export function FamilyFooter() {
  return (
    <React.Fragment>
      <div className="fixed-bottom text-center mb-2">
        <div>Gemaakt door Samuel</div>
      </div>
    </React.Fragment>
  )
}

mount(FamilyFooter, 'family-footer')