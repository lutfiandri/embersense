import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const insertSensor = async (data) => {
  if (getSensor(data.sensorId)) {
    throw new Error(`Sensor ${data.sensorId} telah ada di database.`);
  }
  await setDoc(doc(db, 'sensors', data.sensorId), data);
};

export const updateSensor = async (data) => {
  if (!getSensor(data.sensorId)) {
    throw new Error(`Sensor ${data.sensorId} tidak ditemukan di database.`);
  }
  await setDoc(doc(db, 'sensors', data.sensorId), data);
};

export const getSensor = async (id) => {
  const docRef = doc(db, 'sensors', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    return null;
  }
};
