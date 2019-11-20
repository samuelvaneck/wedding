import * as React from 'react'
import { mount } from '../../../application/mount'


interface RSVPCardProps {
  familyName: string
  guests: []
}

export class RSVPCard extends React.Component<RSVPCardProps> {
  state: RSVPCardProps

  constructor(props: RSVPCardProps) {
    super(props)
    this.state = {
      familyName: this.props.familyName,
      guests: this.props.guests
    }
  }

  handleSubmit(event) {
    console.log(event);
  }

  render() {
    const guests = this.state.guests.map((guest: { name: string }, idx) => {
      return(
        <li className="list-group-item" key={idx}>
          <div className="d-flex">
            <div>{guest.name}</div>
            <div className="ml-auto mr-4">
              <label htmlFor="attending" className='toggle'>
                <input type='checkbox' name='attending' />
                <span></span>
              </label>
            </div>
          </div>
        </li>
      )
    });

    return (
      <React.Fragment>
        <div className='card shadow rounded'>
          <div className='card-header'>
            <div className="d-flex justify-content-center">
              <div className="mt-2"><h5><strong>{this.state.familyName}</strong></h5></div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <ul className="list-group list-group-flush">
                {guests}
              </ul>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
