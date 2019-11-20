import * as React from 'react'
import { mount } from '../../application/mount'
import { CodeUUIDCard } from './cards/CodeUUIDCard'
import { RSVPCard } from './cards/RSVPCard'

interface CardsContainerState {
  current_card: string
  family?: { name: string }
  guests: []
}

export class CardsContainer extends React.Component<CardsContainerState> {
  state: CardsContainerState

  constructor(props) {
    super(props)
    this.state = {
      current_card: 'code_uuid_card',
      family: { name: '' },
      guests: []
    }
  }

  handleCardChange = (id: string, family: { guests: [] }) => {
    this.setState({ current_card: id, family: family, guests: family.guests })
  }

  render() {
    if (this.state.current_card =='code_uuid_card') {
      return (
        <CodeUUIDCard title='Bruiloft Code' handleCardChange={this.handleCardChange} />
      )
    } else if (this.state.current_card == 'rsvp_card') {
      return (
        <RSVPCard familyName={this.state.family.name} guests={this.state.guests} />
      )
    }
    
  }
}

mount(CardsContainer, 'cards-container')