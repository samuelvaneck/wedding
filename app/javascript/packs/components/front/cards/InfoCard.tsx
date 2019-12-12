import * as React from 'react'
import { GoogleMap } from './Map'
const marienHofImg = require('@images/marienhof.jpg')

interface InfoCardProps {

}

interface InfoCardState {

}

export class InfoCard extends React.Component<InfoCardProps, InfoCardState> {
  state: InfoCardState

  constructor(props: InfoCardProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div className="card shadow rounded pb-3">
          <div className="card-header"><h4>Informatie</h4></div>
          <div className="card-img-top"><img src={marienHofImg} className='w-100'></img></div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item bg-light">Locatie</li>
              <li className="list-group-item"><GoogleMap lat={52.153595} lng={5.390943} /></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}