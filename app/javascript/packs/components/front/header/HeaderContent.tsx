import * as React from 'react'

interface headerTextProps {
  coupleNames: string
  weddingDate: string
}

interface headerTextState {
  currentTextIdx: number
}

const headerTexts = (props: headerTextProps) => [props.coupleNames, props.weddingDate]

export class HeaderContent extends React.Component<headerTextProps, headerTextState> {
  readonly state = {
    currentTextIdx: 0
  }

  componentDidMount() {
    const nTexts = headerTexts(this.props).length;
    setInterval(() => {
      let currentIdx = this.state.currentTextIdx;
      this.setState({
        currentTextIdx: (currentIdx + 1) % nTexts
      })
    }, 5000);
  }

  render() {
    let headerText = headerTexts(this.props)[this.state.currentTextIdx]
    return(
      <React.Fragment>
        <div className="m-2">
          <h1>Bruiloft</h1>
        </div>
        <div className="m-2 d-flex flex-column text-center">
          {headerText}
        </div>
      </React.Fragment>
    )
  }
}

