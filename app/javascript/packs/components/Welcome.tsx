import * as React from 'react';
import { mount } from '../application/mount';

interface WelcomeProps {
  message: string
}

export const Welcome: React.FC<WelcomeProps> = ({ message }) => {
  return (
    <button onClick={ () => console.log(message) }>
      Click me!
    </button>
  )
}

mount(Welcome, 'welcome-button');

