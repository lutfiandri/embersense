import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Drawer, Form, Popconfirm, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "@/services/firebase";
import AddSensorModal from "../sensor/AddSensorModal";
import { TbAdjustmentsDollar } from "react-icons/tb";
import { deleteSensor } from "@/services/sensor";

export default function Map() {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [now, setNow] = useState();

  const [isWantToCreate, setIsWantToCreate] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [cursorLat, setCursorLat] = useState(0);
  const [cursorLong, setCursorLong] = useState(0);

  const [selectedSensor, setSelectedSensor] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    });
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const q = query(collection(db, "sensors"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sensors = [];
      querySnapshot.forEach((doc) => {
        sensors.push(doc.data());
      });
      setSensors([...sensors]);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(sensors);
  }, [sensors]);

  const getColor = useCallback(
    (sensor) => {
      if (!sensor.lastPacketCount) {
        // belum pernah aktif
        return "green";
      }
      const nowSeconds = now.getTime() / 1000;
      const updatedAtSeconds = sensor.updatedAt.seconds;
      if (nowSeconds - updatedAtSeconds < 60) {
        // sedang aktif, sampai 60 detik
        return "yellow";
      }

      // udah pernah aktif, udah mati juga
      return "blue";
    },
    [now]
  );

  const center = [-7.76535863145401, 110.37231832786686]; // sglc
  return (
    <div className="relative isolate">
      {notificationContextHolder}

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
            key={sensor.sensorId + getColor(sensor)}
            center={[sensor?.latitude || 0, sensor?.longitude || 0]}
            radius={10}
            color={getColor(sensor)}
            fillColor={getColor(sensor)}
            fillOpacity={0.7}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: () => {
                setIsDrawerOpen(true);
                setSelectedSensor(sensor);
              },
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
        notificationApi={notificationApi}
      />

      <Drawer
        title={selectedSensor?.sensorName}
        placement="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="text-sm text-gray-600">ID Sensor</div>
              <div>{selectedSensor?.sensorId}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-600">Nama Sensor</div>
              <div>{selectedSensor?.sensorName}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-600">Lokasi</div>
              <div>
                {selectedSensor?.latitude?.toFixed(10)},{" "}
                {selectedSensor?.longitude?.toFixed(10)}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-600">Waktu Ditambahkan</div>
              <div>{formatDateSeconds(selectedSensor?.createdAt?.seconds)}</div>
            </div>
          </div>
          <Popconfirm
            title="Hapus Sensor"
            description={`Yakin ingin menghapus ${selectedSensor?.sensorId} (${selectedSensor?.sensorName})?`}
            okText="Ya, hapus"
            cancelText="Tidak, batal hapus"
            placement="topRight"
            onConfirm={async () => {
              try {
                await deleteSensor(selectedSensor?.sensorId);
                notificationApi.success({
                  message: "Berhasil",
                  description: `Sensor ${selectedSensor?.sensorName} berhasil dihapus`,
                });
              } catch (error) {
                notificationApi.error({
                  message: "Gagal menghapus sensor",
                  description: error.message,
                });
              }
            }}
          >
            <Button type="primary" danger>
              Hapus Sensor
            </Button>
          </Popconfirm>
        </div>
      </Drawer>
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
      setCursorLat(e?.latlng?.lat);
      setCursorLong(e?.latlng?.lng);
    },
    click: (e) => {
      if (isWantToCreate) {
        setIsCreateModalOpen(true);
      }
    },
  });
  return <></>;
}
6;
const formatDateSeconds = (seconds) => {
  const date = new Date(seconds * 1000 || 0);
  const options = {
    year: "numeric",
    month: "long", // 'long' displays the full month name
    day: "numeric",
    hour: "2-digit", // Display the hour in 2-digit format (e.g., 09)
    minute: "2-digit", // Display the minute in 2-digit format (e.g., 05)
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};
