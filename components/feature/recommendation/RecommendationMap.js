import {
  CircleMarker,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Drawer, Form, Popconfirm, notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import AddSensorModal from '../sensor/AddSensorModal';
import { deleteSensor } from '@/services/sensor';
import RecommendationModal from './RecommendationModal';

export default function RecommendationMap() {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [cursorLat, setCursorLat] = useState(0);
  const [cursorLong, setCursorLong] = useState(0);

  const [step, setStep] = useState(0);
  // 0: input polygon
  // 1: input form
  // 2: show recommendation

  const [polygonNodes, setPolygonNodes] = useState([]);

  const [recommendationResult, setRecommendationResult] = useState({});

  const center = [-7.76535863145401, 110.37231832786686]; // sglc
  return (
    <div className="relative isolate text-xs md:text-sm lg:text-base">
      {notificationContextHolder}

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="bg-red-500 w-full h-[calc(100vh-48px)] lg:h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvent
          setCursorLat={setCursorLat}
          setCursorLong={setCursorLong}
          step={step}
          setPolygonNodes={setPolygonNodes}
        />

        {step === 2
          ? recommendationResult?.nodes?.map((node) => (
              <CircleMarker
                key={node[0]}
                center={node}
                radius={5}
                color="yellow"
                fillColor="yellow"
                fillOpacity={0.7}
              />
            ))
          : null}

        <Polygon positions={polygonNodes} />
      </MapContainer>

      <RecommendationModal
        form={form}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        notificationApi={notificationApi}
        polygonNodes={polygonNodes}
        setRecommendationResult={setRecommendationResult}
        setStep={setStep}
      />

      <div className="bg-white px-4 py-2 z-[1000] absolute left-0 bottom-0 font-mono">
        {cursorLat.toFixed(10)}, {cursorLong.toFixed(10)}
      </div>

      {step === 0 ? (
        <>
          <div className="bg-white px-4 py-2 z-[1000] absolute top-16 md:top-4 left-1/2 -translate-x-1/2 shadow-md font-mono text-center">
            Mode pembuatan poligon.
            <br />
            Tekan di peta untuk titik-titik batas poligon.
          </div>
          <Button
            type="primary"
            danger
            className="absolute top-8 right-8 z-[1000]"
            onClick={() => setPolygonNodes([])}
          >
            Reset Poligon
          </Button>
          <Button
            type="primary"
            disabled={polygonNodes?.length < 3}
            className="absolute bottom-8 right-8 z-[1000]"
            onClick={() => {
              setStep(1);
              setIsModalOpen(true);
            }}
          >
            Selesai Gambar Poligon
          </Button>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Button
            type="primary"
            className="absolute bottom-8 right-8 z-[1000]"
            onClick={() => {
              setPolygonNodes([]);
              setRecommendationResult({});
              setStep(0);
            }}
          >
            Ulang Rekomendasi
          </Button>
        </>
      ) : null}
    </div>
  );
}

function MapEvent({ setCursorLat, setCursorLong, step, setPolygonNodes }) {
  useMapEvents({
    mousemove: (e) => {
      setCursorLat(e?.latlng?.lat);
      setCursorLong(e?.latlng?.lng);
    },
    click: (e) => {
      if (step === 0) {
        // input polygon
        const latlng = [e.latlng.lat, e.latlng.lng];
        setPolygonNodes((prev) => [...prev, latlng]);
      }
    },
  });
  return <></>;
}

const formatDateSeconds = (seconds) => {
  const date = new Date(seconds * 1000 || 0);
  const options = {
    year: 'numeric',
    month: 'long', // 'long' displays the full month name
    day: 'numeric',
    hour: '2-digit', // Display the hour in 2-digit format (e.g., 09)
    minute: '2-digit', // Display the minute in 2-digit format (e.g., 05)
  };

  const formatter = new Intl.DateTimeFormat('id-ID', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};
