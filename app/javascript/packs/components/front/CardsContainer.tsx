import * as React from 'react'
import { mount } from '../../application/mount'
import { CodeUUIDCard } from './cards/CodeUUIDCard'
import { RSVPCard } from './cards/RSVPCard'

interface CardsContainerState {
  current_card: string
  family?: { name: string }
  guests: []
  message: { content: string }
}

export class CardsContainer extends React.Component<CardsContainerState> {
  state: CardsContainerState

  constructor(props) {
    super(props)
    this.state = {
      current_card: 'code_uuid_card',
      family: { name: '' },
      guests: [],
      message: { content: '' }
    }
  }

  handleCardChange = (id: string, family: { guests: [], message: {} }) => {
    this.setState({ current_card: id, family: family, guests: family.guests, message: family.message })
  }

  render() {
    if (this.state.current_card =='code_uuid_card') {
      return (
        <CodeUUIDCard title='Bruiloft Code' handleCardChange={this.handleCardChange} />
      )
    } else if (this.state.current_card == 'rsvp_card') {
      return (
        <RSVPCard familyName={this.state.family.name} guests={this.state.guests} message={this.state.message} />
      )
    }
    
  }
}

mount(CardsContainer, 'cards-container')