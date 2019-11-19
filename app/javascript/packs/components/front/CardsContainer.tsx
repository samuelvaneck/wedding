import * as React from 'react'
import { mount } from '../../application/mount'
import { CodeUUIDCard } from './cards/CodeUUIDCard'
import { RSVPCard } from './cards/RSVPCard'

interface CardsContainerState {
  current_card: string
}

export class CardsContainer extends React.Component<CardsContainerState> {
  state: CardsContainerState

  constructor(props) {
    super(props)
    this.state = {
      current_card: 'code_uuid_card'
    }
  }

  handleCardChange = (id: string) => {
    this.setState({ current_card: id })
  }

  render() {
    if (this.state.current_card =='code_uuid_card') {
      return (
        <CodeUUIDCard title='Bruiloft Code' handleCardChange={this.handleCardChange} />
      )
    } else if (this.state.current_card == 'rsvp_card') {
      return (
        <RSVPCard />
      )
    }
    
  }
}

mount(CardsContainer, 'cards-container')