import * as React from 'react'
import { mount } from '../../application/mount'
import { CodeUUIDCard } from './cards/CodeUUIDCard'
import { RSVPCard } from './cards/RSVPCard'

interface Guest {
  id: number
  name: string
  attending: boolean
  day_guest: boolean
}

interface CardsContainerState {
  current_card: string
  family: { 
    id: number, 
    name: string,
    guests: {
      [key: string]: Guest
    },
    message: { content: string } 
  }
}

const getInitialCurrentCard = () => 'code_uuid_card';
const getInitialFamily = () => { return { id: -1, name: '', guests: {}, message: { content: '' } } }; 

export class CardsContainer extends React.Component<CardsContainerState> {
  readonly state = {
    current_card: getInitialCurrentCard(),
    family: getInitialFamily()
  }

  handleCardChange = (id: string, family: { id: number, name: string, guests: { [key: string]: Guest }, message: { content: string } }) => {
    this.setState({ current_card: id, family: family })
  }

  render() {
    if (this.state.current_card =='code_uuid_card') {
      return (
        <CodeUUIDCard title='Bruiloft Code' handleCardChange={this.handleCardChange} />
      )
    } else if (this.state.current_card == 'rsvp_card') {
      return (
        <RSVPCard family={this.state.family} />
      )
    }
    
  }
}

mount(CardsContainer, 'cards-container')