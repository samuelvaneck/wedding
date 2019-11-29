import * as React from 'react'

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
  handleRSVPCardChange: (id: string) => void
}

interface RSVPCardState {
  family: { id: number, name: string, guests: { [key: string]: Guest }, message: { content: string } }
  submitSuccess: boolean
}

const getInitialFamily = (props: RSVPCardProps) => props.family

export class RSVPCard extends React.Component<RSVPCardProps, RSVPCardState> {
  state: RSVPCardState

  constructor(props: RSVPCardProps) {
    super(props);
    this.state = {
      family: getInitialFamily(this.props),
      submitSuccess: null
    }

    this.handleChangeGuestAttending = this.handleChangeGuestAttending.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMessageContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    const family = { ...this.state.family }
    const message = { ...this.state.family.message }

    message.content = value;
    family.message = message;

    this.setState({ family });
  }

  handleChangeGuestAttending(event: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const target = event.target;
    const value = target.checked;
    let family = { ...this.state.family };
    let guest = { ...this.state.family.guests[idx] }

    guest.attending = value;
    family.guests[idx] = guest;

    this.setState({ family });
  }

  handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const family = { ...this.state.family };
    const elem: HTMLMetaElement = document.querySelector('[name="csrf-token"]');
    const csrfToken = elem.content;

    const data = Object.keys(family).reduce((f, key) => {
      if (['id', 'email', 'name', 'created_at', 'updated_at', 'uuid', 'response'].indexOf(key) == -1) {
        if (key == 'guests') {
          f['guests_attributes'] = [];
          Object.keys(family[key]).map(idx => {
            let guest = {}
            Object.keys(family[key][idx]).map(gKey => {
              if (['created_at', 'updated_at', 'name', 'day_guest', 'family_id'].indexOf(gKey) == -1) {
                guest[gKey] = family[key][idx][gKey]
              }
              f['guests_attributes'][idx] = guest;
            })
          });
        } else if (key === 'message') {
          f['message_attributes'] = {}
          Object.keys(family[key]).map((mKey) => {
            if (['family_id', 'created_at', 'updated_at'].indexOf(mKey) == -1) {
              f['message_attributes'][mKey] = family[key][mKey];
            }
          })
        } else {
          if (f === undefined) { f = {} }
          f[key] = family[key];
        }
        return f
      }
    }, {});

    fetch('/families/' + family.id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHTTPRequest'
      }
    }).then(response => response.json())
      .then(data => {
        this.setState({ submitSuccess: data['success'] })
        setTimeout(() => {
          this.props.handleRSVPCardChange('info_card');
        }, 2000)
      });
  }

  renderSubmitFeedback() {
    let submitText = ''

    if (this.state.submitSuccess) {
      submitText = 'Bedankt voor het doorgeven van je RSVP!'
    } else if (this.state.submitSuccess == null) {
      submitText = ''
    } else {
      submitText = 'Fout tijdens opslaan. Probeer het opnieuw.'
    }

    return <span>{submitText}</span>
  }

  render() {
    const guestsInputFields = Object.keys(this.state.family.guests).map((key, idx) => {
      const guest = this.state.family.guests[key];
      return (
        <li className="list-group-item" key={idx}>
          <div className="d-flex">
            <div>{guest.name}</div>
            <div className="ml-auto mr-4">
              <input type='checkbox' name='attending'
                onChange={(event) => this.handleChangeGuestAttending(event, idx)}
                defaultChecked={guest.attending} />
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
                    <textarea value={this.state.family.message.content} onChange={event => { this.handleChangeMessageContent(event) }} className='form-control' />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    {this.renderSubmitFeedback()}
                    <input type="submit" value='Verstuur' className='btn btn-outline-primary' onClick={(event) => this.handleSubmit(event)} />
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
