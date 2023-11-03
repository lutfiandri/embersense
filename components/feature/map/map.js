import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/services/firebase';

export default function Map() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'sensors'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sensors = [];
      querySnapshot.forEach((doc) => {
        sensors.push(doc.data());
      });
      setSensors([...sensors]);
    });

    return () => unsubscribe();
  }, []);

  const center = [-7.76535863145401, 110.37231832786686]; // sglc
  return (
    <div className="relative isolate">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="bg-red-500 w-full h-[calc(100vh-112px)]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensors.map((sensor) => (
          <CircleMarker
            key={sensor.sensorId}
            center={[sensor.latitude, sensor.longitude]}
            radius={10}
            color="red"
            fillColor="red"
            fillOpacity={0.7}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: () => setIsDrawerOpen(true),
            }}
          >
            <Popup autoClose closeButton={true}>
              {sensor.sensorId} - {sensor.sensorName}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <Drawer
        title="device id"
        placement="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      ></Drawer>
    </div>
  );
}
