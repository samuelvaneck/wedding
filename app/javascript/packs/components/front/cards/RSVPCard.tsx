import * as React from 'react'
import { mount } from '../../../application/mount'
import { InputType } from 'zlib'
import { runInThisContext } from 'vm'

interface Guest {
  id: number
  name: string
  attending: boolean
  day_guest: boolean
}

interface Message {
  content: string
}

interface RSVPCardProps {
  family: {
    id: number
    name: string
    guests: {
      [key: string]: Guest
    }
    message: Message
  }
}

interface RSVPCardState {
  family: { id: number, name: string, guests: { [key: string]: Guest }, message: { content: string }}
  submitSuccess: boolean
}

const getInitialFamily = (props: RSVPCardProps) => props.family

export class RSVPCard extends React.Component<RSVPCardProps, RSVPCardState> {
  state: RSVPCardState
  
  constructor(props: RSVPCardProps) {
    super(props);
    this.state = {
      family: getInitialFamily(this.props),
      submitSuccess: false
    }

    this.handleChangeGuestAttending = this.handleChangeGuestAttending.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMessageContent() {
    console.log(event);
  }

  handleChangeGuestAttending(event: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const target = event.target;
    const value = target.checked;
    let family = { ...this.state.family };
    let guest = { ...this.state.family.guests[idx] }
    guest.attending = value;
    family.guests[idx] = guest
    this.setState({ family })
  }

  handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const family = { ...this.state.family };
    const elem: HTMLMetaElement = document.querySelector('[name="csrf-token"]');
    const csrfToken = elem.content;

    fetch('/families/' + family.id, {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHTTPRequest' 
      }
    }).then(response => response.json)
  }

  render() {
    const guestsInputFields = Object.keys(this.state.family.guests).map((key, idx) => {
      const guest = this.state.family.guests[key];
      const attending = guest.attending ? 't' : 'f'
      return(
        <li className="list-group-item" key={idx}>
          <div className="d-flex">
            <div>{guest.name}</div>
            <div className="ml-auto mr-4">
              <input type='checkbox' name='attending' 
                     onChange={(event) => this.handleChangeGuestAttending(event, idx)}
                     defaultValue={attending} />
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
              <div className="mt-2"><h5><strong>{this.props.family.name}</strong></h5></div>
            </div>
          </div>
          <div className="card-body">
            <form>
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
                    <textarea value={this.state.family.message.content} onChange={this.handleChangeMessageContent} className='form-control' />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-end">
                      <input type="submit" value='Verstuur' className='btn btn-outline-primary' onClick={(event) => this.handleSubmit(event) } />
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
