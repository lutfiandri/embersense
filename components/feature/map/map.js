import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  return (
    <div className="">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="bg-red-500 w-full h-[calc(100vh-112px)]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[51.505, -0.09]}
          radius={10}
          color="red"
          fillColor="red"
          fillOpacity={0.7}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
          }}
        >
          <Popup autoClose closeButton={true}>
            Device Id: ....
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
