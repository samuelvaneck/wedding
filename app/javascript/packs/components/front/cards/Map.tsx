import * as React from 'react';
import GoogleMapReact from 'google-map-react';

interface MapProps {
  lat: number
  lng: number
}

interface MapState {
  lat: number
  lng: number
  zoom: number
}

const getInitialLat = (props: MapProps) => props.lat;
const getInitailLng = (props: MapProps) => props.lng;

const MapComponent = ({text}: any) => <div>{text}</div>


export class GoogleMap extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props)
    this.state = {
      lat: getInitialLat(this.props),
      lng: getInitailLng(this.props),
      zoom: 15
    }
  }

  render() {
    const renderMarker = (map, maps) => {
      let marker = new maps.Marker({
        position: { lat: this.state.lat, lng: this.state.lng },
        map,
        title: 'Bruiloft locatie'
      })
      return marker;
    }
    const center = { lat: this.state.lat, lng: this.state.lng }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
        >
          <MapComponent lat={this.state.lat} lng={this.state.lng} text="" />
        </GoogleMapReact>
      </div>
    )
  }
}