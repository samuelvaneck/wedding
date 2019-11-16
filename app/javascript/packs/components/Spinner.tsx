import * as React from 'react'

interface SpinnerProps {
  hidden: boolean
}

export class Spinner extends React.Component<SpinnerProps> {
  constructor(props: SpinnerProps) {
    super(props)
    this.state = {
      showWarning: !this.props.hidden
    }
  }
  render() {
    if (!this.props.hidden) { return null }

    return (
      <React.Fragment>
        <div className={"d-flex justify-content-center mt-3 mb-3"}>
          <div id="status">
            <span className={"mr-3 status-text"}>Checking</span>
            <i className={"fas fa-spinner fa-pulse"} id="spinner"></i>
          </div>
        </div>
      </React.Fragment>
    )
  }
}