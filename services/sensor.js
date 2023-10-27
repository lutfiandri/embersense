import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const upsertSensor = async (data) => {
  await setDoc(doc(db, 'sensors', data.sensorId), data);
};
