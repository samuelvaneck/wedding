import * as React from 'react'

interface progrssBarProps {
  progress: number
}

interface progressBarState { }

export class ProgressBar extends React.Component<progrssBarProps, progressBarState> {
  constructor(props: progrssBarProps) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className='progress-bar'>
        <div className="progress" 
             style={{ width: this.props.progress }}
        />
      </div>
    )
  }
}