import * as React from 'react'
import { mount } from '../application/mount';
import { Spinner } from './Spinner'
import { CodeInputField } from './CodeInputField'
import { fail } from 'assert';
import { string, any } from 'prop-types';

interface CodeUUIDProps {
  title: string
}

interface CodeUUIDState {
  "code-input-0": string
  "code-input-1": string
  "code-input-2": string
  "code-input-3": string
  "code-input-4": string
  "code-input-5": string
  spinner: boolean
}

const getInitialSpinner = (props: CodeUUIDState) => props.spinner;

export class CodeUUID extends React.Component<CodeUUIDProps, CodeUUIDState> {
  state: CodeUUIDState

  constructor(props: CodeUUIDProps) {
    super(props)
    this.state = {
      "code-input-0": '',
      "code-input-1": '',
      "code-input-2": '',
      "code-input-3": '',
      "code-input-4": '',
      "code-input-5": '',
      spinner: false
    }
  }

  componentDidMount() {
    document.getElementById('code-input-0').focus()
  }

  handleInputKeyUp = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLTextAreaElement
    const idx = parseInt(target.id.replace('code-input-', ''))

    if (event.keyCode == 8) {
      this.setState(state => ({
        ...state,
        [target.id]: ''
      }));
      if (idx == 0) return
      document.getElementById('code-input-' + (idx - 1)).focus()
    } else {
      if (idx == 5) return;
      document.getElementById('code-input-' + (idx + 1)).focus()
    }
  }

  checkValue = () => {
    const codeInput = [this.state['code-input-0'], this.state['code-input-1'], this.state['code-input-2'], this.state['code-input-3'], this.state['code-input-4'], this.state['code-input-5']]
    let code = ''
    codeInput.forEach(d => { if (!!d) code += d; });
    this.setState({ spinner: code.length == 6 })

    if (code.length == 6) {
      setTimeout(() => {
        try {
          // TODO: CRATE FORM FOR LOGIN AND PASS CRF TOKEN IN HEADER
          fetch('/families/flip_card/?uuid=' + code + '&card_id=card-reply&login=true', {
            method: 'GET',
            headers: {
              'Accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript,'
            }
          })
          // let data = {
          //   uuid: code,
          //   card_id: 'card-reply',
          //   login: true
          // };

          // $.get("/families/flip_card", data, null, "script").fail(() => {
          //   this.resetInputFields()
          // });
        } catch (error) {
          this.resetInputFields()
        }

      }, 1000);
    }
  }

  resetInputFields = () => {
    this.setState({
      'code-input-0': '',
      'code-input-1': '',
      'code-input-2': '',
      'code-input-3': '',
      'code-input-4': '',
      'code-input-5': '',
      spinner: false
    })
    document.getElementById('code-input-0').focus()
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    
    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }), this.checkValue);
  }

  render() {
    return (
      <React.Fragment>
        <div className="card pb-3">
          <div className="card-header">
            <div className="d-flex justify-content-center"><h4>{this.props.title}</h4></div>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6 p-1">
                  <div className="d-flex code-input-left">
                    <CodeInputField id="code-input-0" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-0']} inputChange={this.handleInputChange} />
                    <CodeInputField id="code-input-1" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-1']} inputChange={this.handleInputChange} />
                    <CodeInputField id="code-input-2" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-2']} inputChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 p-1">
                  <div className="d-flex code-input-right">
                    <CodeInputField id="code-input-3" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-3']} inputChange={this.handleInputChange} />
                    <CodeInputField id="code-input-4" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-4']} inputChange={this.handleInputChange} />
                    <CodeInputField id="code-input-5" inputKeyUp={this.handleInputKeyUp} value={this.state['code-input-5']} inputChange={this.handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Spinner hidden={this.state.spinner} />
        </div>
      </React.Fragment>
    )
  }
}

mount(CodeUUID, 'card-uuid')