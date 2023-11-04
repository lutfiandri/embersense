import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const insertSensor = async (data) => {
  const now = new Date();
  data.createdAt = now;
  data.updatedAt = now;
  const sensor = await getSensor(data.sensorId);
  if (sensor) {
    throw new Error(`Sensor ${data.sensorId} telah ada di database.`);
  }
  await setDoc(doc(db, 'sensors', data.sensorId), data);
};

export const updateSensor = async (data) => {
  const now = new Date();
  data.updatedAt = now;

  const sensor = await getSensor(data.sensorId);
  if (!sensor) {
    throw new Error(`Sensor ${data.sensorId} tidak ditemukan di database.`);
  }
  await setDoc(doc(db, 'sensors', data.sensorId), data, {
    merge: true,
  });
};

export const getSensor = async (id) => {
  const docRef = doc(db, 'sensors', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
