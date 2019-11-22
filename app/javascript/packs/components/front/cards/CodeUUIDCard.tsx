import * as React from 'react'
// import { mount } from '../../../application/mount';
import { Spinner } from './Spinner'
import { CodeInputField } from './CodeInputField'
import { fail } from 'assert';
import { string, any } from 'prop-types';

interface GuestProps {
  id: number
  name: string
  attending: boolean
  day_guest: boolean
}

interface CodeUUIDProps {
  title: string
  handleCardChange: (id: string, family: { id: number, name: string, guests: { [key: string]: GuestProps }, message: {} }) => void
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

export class CodeUUIDCard extends React.Component<CodeUUIDProps, CodeUUIDState> {
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
          const elem: HTMLMetaElement = document.querySelector('[name="csrf-token"]');
          const csrfToken = elem.content;
          const url = '/families/login/?uuid=' + code + '&card_id=card-reply&login=true'
          
          fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'X-CSRF-Token': csrfToken,
              'X-Requested-With': 'XMLHTTPRequest' 
            }
          }).then(response => { 
            if (response.status == 404) { 
              this.resetInputFields() 
            } else { return response.json(); }
          }).then(family => {
            this.props.handleCardChange('rsvp_card', family)
          });
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
        <div className="card shadow rounded pb-3">
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

// mount(CodeUUIDCard, 'card-uuid')