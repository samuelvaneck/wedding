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
    if (!this.props.hidden) { return (
      <div className="d-flex justify-content-center mt-3 mb-3"></div>
    ) }

    return (
      <React.Fragment>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <div id="status">
            <span className="mr-3 status-text">Checking</span>
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}