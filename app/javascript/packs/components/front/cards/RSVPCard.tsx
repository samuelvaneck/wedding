import * as React from 'react'
import { mount } from '../../../application/mount'


interface RSVPCardProps {
  familyName: string
  guests: []
  message: { content: string }
}

export class RSVPCard extends React.Component<RSVPCardProps> {
  state: RSVPCardProps

  constructor(props: RSVPCardProps) {
    super(props)
    this.state = {
      familyName: this.props.familyName,
      guests: this.props.guests,
      message: this.props.message
    }
  }

  handleChangeMessageContent() {
    console.log(event);
  }

  handleSubmit(event) {
    console.log(event);
  }

  render() {
    const guestsInputFields = this.state.guests.map((guest: { name: string }, idx) => {
      return(
        <li className="list-group-item" key={idx}>
          <div className="d-flex">
            <div>{guest.name}</div>
            <div className="ml-auto mr-4">
              <input type='checkbox' name='attending' />
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
                <li className="list-group-item">
                  <div className="d-flex">
                    <div><strong>Gasten</strong></div>
                    <div className="ml-auto">Aanwezig</div>
                  </div>
                </li>
                {guestsInputFields}
                <li className="list-group-item">
                  <div className="form-group">
                    <strong>Bericht</strong>
                    <textarea value={this.state.message.content} onChange={this.handleChangeMessageContent} className='form-control' />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-end">
                      <input type="submit" value='Verstuur' className='btn btn-outline-primary' />
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
