import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Measurement {
  id: string;
  date: string;
  weight?: string;
  height?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  arm?: string;
  thigh?: string;
  userId: string;
  createdAt: Timestamp;
}

export interface MeasurementInput {
  date: string;
  weight?: string;
  height?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  arm?: string;
  thigh?: string;
}

// Get measurements collection reference for a user
function getMeasurementsCollection(userId: string) {
  return collection(db, `users/${userId}/measurements`);
}

// Fetch all measurements for a user
export async function getMeasurements(userId: string): Promise<Measurement[]> {
  try {
    const measurementsRef = getMeasurementsCollection(userId);
    const q = query(measurementsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Measurement[];
  } catch (error) {
    console.error('Error fetching measurements:', error);
    throw new Error('Erro ao buscar medições');
  }
}

// Create a new measurement
export async function createMeasurement(
  userId: string,
  data: MeasurementInput
): Promise<Measurement> {
  try {
    const measurementsRef = getMeasurementsCollection(userId);
    const measurementData = {
      ...data,
      userId,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(measurementsRef, measurementData);
    
    return {
      id: docRef.id,
      ...measurementData,
    } as Measurement;
  } catch (error) {
    console.error('Error creating measurement:', error);
    throw new Error('Erro ao criar medição');
  }
}

// Delete a measurement
export async function deleteMeasurement(
  userId: string,
  measurementId: string
): Promise<void> {
  try {
    const measurementRef = doc(
      db,
      `users/${userId}/measurements/${measurementId}`
    );
    await deleteDoc(measurementRef);
  } catch (error) {
    console.error('Error deleting measurement:', error);
    throw new Error('Erro ao deletar medição');
  }
}

// Migrate localStorage data to Firestore
export async function migrateLocalStorageData(
  userId: string
): Promise<number> {
  try {
    const stored = localStorage.getItem('measurements');
    if (!stored) return 0;

    const localMeasurements = JSON.parse(stored) as Array<{
      id: string;
      date: string;
      weight?: string;
      height?: string;
      chest?: string;
      waist?: string;
      hips?: string;
      arm?: string;
      thigh?: string;
    }>;

    let migrated = 0;
    for (const measurement of localMeasurements) {
      const { id, ...data } = measurement;
      await createMeasurement(userId, data);
      migrated++;
    }

    // Clear localStorage after successful migration
    localStorage.removeItem('measurements');
    return migrated;
  } catch (error) {
    console.error('Error migrating data:', error);
    throw new Error('Erro ao migrar dados');
  }
}
