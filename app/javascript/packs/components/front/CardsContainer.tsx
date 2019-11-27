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

  handleLoginCardChange = (id: string, family: { id: number, name: string, guests: { [key: string]: Guest }, message: { content: string } }) => {
    this.setState({ current_card: id, family: family })
  }

  handleRSVPCardChange = (id: string) => {
    this.setState({ current_card: id })
  }

  render() {
    if (this.state.current_card =='code_uuid_card') {
      return (
        <CodeUUIDCard title='Bruiloft Code' handleLoginCardChange={this.handleLoginCardChange} />
      )
    } else if (this.state.current_card == 'rsvp_card') {
      return (
        <RSVPCard family={this.state.family} handleRSVPCardChange={this.handleRSVPCardChange} />
      )
    } else if (this.state.current_card == 'info_card') {
      console.log('hit!');
    }
    
  }
}

mount(CardsContainer, 'cards-container')