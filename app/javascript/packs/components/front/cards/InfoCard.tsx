import * as React from 'react'
import { GoogleMap } from './Map'
const marienHofImg = require('@images/marienhof.jpg')
const marienHofLogo = require('@images/logo_marienhof.png')
const imgRian = require('@images/rian.jpg')

interface Guest {
  id: number
  name: string
  attending: boolean
  day_guest: boolean
}
interface InfoCardProps {
  family: { 
    id: number, 
    name: string,
    allergies: string,
    response: boolean,
    guests: {
      [key: string]: Guest
    },
    message: { content: string } 
  }
}

interface InfoCardState {

}

export class InfoCard extends React.Component<InfoCardProps, InfoCardState> {
  state: InfoCardState

  constructor(props: InfoCardProps) {
    super(props)
    this.state = {}
  }

  render() {
    const familyDayGuests = Object.keys(this.props.family.guests).map((key, idx) => {
      const guest = this.props.family.guests[key];
      return guest.day_guest;
    });

    const DayProgram = (props) => {
      const dayGuests = props.dayGuests;
      if (dayGuests) {
        return (
          <React.Fragment>
            <li className="list-group-item bg-light"><h3>Dag programma</h3></li>
            <li className="list-group-item">
              <ul className="list-group">
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>13.30u</strong></div>
                  <div>Ontvangst met koffie en thee</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>14.00u</strong></div>
                  <div>Gemeentelijk huwelijk</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>14.45u</strong></div>
                  <div>Taart en toast</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>15.30u</strong></div>
                  <div>Foto moment</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>16.00u</strong></div>
                  <div>Borrel</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>17.00u</strong></div>
                  <div>Diner</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-2"><strong>18.30u</strong></div>
                  <div>Vrije tijd</div>
                </li>
              </ul>
            </li>
          </React.Fragment>
        )
      } else {
        return <span></span>
      }
    }

    return (
      <React.Fragment>
        <div className="card shadow rounded pb-3">
          <div className="card-header"><h4>Informatie</h4></div>
          <div className="card-img-top"><img src={marienHofImg} className='w-100'></img></div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item bg-light">Locatie</li>
              <li className="list-group-item">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-9">
                      <GoogleMap lat={52.153595} lng={5.390943} />
                    </div>
                    <div className="col-sm-12 col-md-3">
                      <div className="my-2"><img src={marienHofLogo} alt="" className="m-logo"/></div>
                      <div className="my-2">
                        Kleine Haag 2 <br />
                        3811 HE Amersfoort
                      </div>
                      <div className="my-2 text-justify">
                        <h5>Parkeren</h5>
                        Kom je met de auto dan kan je je auto parkeren bij parkeergarage Koestraat. Deze parkeergarage ligt dichtbij de Mariënhof en voor deze parkeergarage zijn er gratis uitrijkaarten beschikbaar.
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <DayProgram dayGuests={familyDayGuests.includes(true)} />
              <li className="list-group-item bg-light"><h3>Avond programma</h3></li>
              <li className="list-group-item">
                <ul className="list-group">
                  <li className="list-group-item d-flex">
                    <div className="mr-2"><strong>19.30u</strong></div>
                    <div>Kerk dienst</div>
                  </li>
                  <li className="list-group-item d-flex">
                    <div className="mr-2"><strong>20.30u</strong></div>
                    <div>Feest</div>
                  </li>
                  <li className="list-group-item d-flex">
                    <div className="mr-2"><strong>00.30u</strong></div>
                    <div>Einde feest</div>
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-light">
                <h3>Ceremoniemeester</h3>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col col-md-3 col-lg-2 text-center mb-3">
                    <img src={imgRian} alt="" className="img-mc"/>
                  </div>
                  <div className="col-sm-12 col-md-9 col-lg-10">
                    <div className="d-md-none">
                      <h4 className="text-center">Rianne Rodenburg</h4>
                    </div>
                    <div className="d-none d-md-inline my-3">
                      <h4>Rianne Rodenburg</h4>
                    </div>
                    <div>
                      <div>
                        Hallo, ik ben Rianne! 
                        De ceremoniemeester voor de bruiloft van dit leuke stel &#x1F609;
                      </div>
                      <div className="mt-1">
                        <div>
                          Heb je vragen, wensen of opmerkingen?
                          Dan kun je bij mij terecht. 
                          Stuur dan een mailtje naar: 
                        </div>
                        <div className="mt-1">
                          <a href="mailto:samuelencorinegaantrouwen@gmail.com">
                            samuelencorinegaantrouwen@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}