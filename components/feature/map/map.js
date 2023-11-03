import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Drawer, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import AddSensorModal from '../sensor/AddSensorModal';

export default function Map() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [isWantToCreate, setIsWantToCreate] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [cursorLat, setCursorLat] = useState(0);
  const [cursorLong, setCursorLong] = useState(0);

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

  const onMouseMove = useCallback((event) => console.log(event.latlng), []);

  const center = [-7.76535863145401, 110.37231832786686]; // sglc
  return (
    <div className="relative isolate">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="bg-red-500 w-full h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvent
          setCursorLat={setCursorLat}
          setCursorLong={setCursorLong}
          setIsCreateModalOpen={setIsCreateModalOpen}
          isWantToCreate={isWantToCreate}
          setIsWantToCreate={setIsWantToCreate}
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
              mousemove: onMouseMove,
            }}
          >
            <Popup autoClose closeButton={true}>
              {sensor.sensorId} - {sensor.sensorName}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="bg-white px-4 py-2 z-[1000] absolute left-0 bottom-0 font-mono">
        {cursorLat.toFixed(10)}, {cursorLong.toFixed(10)}
      </div>

      {isWantToCreate ? (
        <>
          <Button
            type="primary"
            danger
            className="absolute bottom-8 right-8 z-[1000]"
            onClick={() => setIsWantToCreate(false)}
          >
            Batal Tambah Sensor
          </Button>
          <div className="bg-white px-4 py-2 z-[1000] absolute top-4 left-1/2 -translate-x-1/2 shadow-md font-mono text-center">
            Mode penambahan sensor.
            <br />
            Tekan di peta untuk menambahkan sensor di lokasi tersebut.
          </div>
        </>
      ) : (
        <Button
          type="primary"
          className="absolute bottom-8 right-8 z-[1000]"
          onClick={() => setIsWantToCreate(true)}
        >
          Tambah Sensor
        </Button>
      )}

      <AddSensorModal
        form={form}
        isOpen={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        lat={cursorLat}
        long={cursorLong}
      />

      <Drawer
        title="device id"
        placement="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      ></Drawer>
    </div>
  );
}

function MapEvent({
  setCursorLat,
  setCursorLong,
  setIsCreateModalOpen,
  isWantToCreate,
  setIsWantToCreate,
}) {
  useMapEvents({
    mousemove: (e) => {
      setCursorLat(e.latlng.lat);
      setCursorLong(e.latlng.lng);
    },
    click: (e) => {
      if (isWantToCreate) {
        setIsCreateModalOpen(true);
      }
    },
  });
  return <></>;
}
