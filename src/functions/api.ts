import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./firebase";
import { addToCollection } from "./add-to-collection";
import { updateDocument } from "./update-doc-in-collection";
import { deleteFirestoreDocument } from "./delete-a-document";
import { getACollection } from "./get-a-collection";

// Generic helper to get collection reference strongly typed
const getColRef = (colName: string): CollectionReference<DocumentData> => {
  return collection(db, colName);
};

// ================== Department API ==================
export const departmentsApi = {
  create: async (data: any) => {
    const ref = await addToCollection("departments", data);
    return { id: ref?.id, ...data };
  },

  getById: async (id: string) => {
    const docRef = doc(db, "departments", id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  update: async (id: string, data: any) => {
    await updateDocument("departments", id, data);
  },

  delete: async (id: string) => {
    await deleteFirestoreDocument("departments", id);
  },

  listenAll: (callback: (data: any[]) => void) => {
    return getACollection("departments", callback);
  },
};

// ================== Cases API ==================
export const casesApi = {
  create: async (data: any) => {
    const ref = await addDoc(getColRef("cases"), data);
    return { id: ref.id, ...data };
  },

  getById: async (id: string) => {
    const docRef = doc(db, "cases", id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  update: async (id: string, data: any) => {
    const docRef = doc(db, "cases", id);
    await updateDoc(docRef, data);
  },

  delete: async (id: string) => {
    const docRef = doc(db, "cases", id);
    await deleteDoc(docRef);
  },

  listenByDepartment: (
    departmentId: string,
    callback: (data: any[]) => void
  ) => {
    const q = query(
      getColRef("cases"),
      where("departmentId", "==", departmentId)
    );
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(data);
    });
  },
};

// ================== Staff API ==================
export const staffApi = {
  create: async (data: any) => {
    const ref = await addToCollection("staff", data);
    return { id: ref?.id, ...data };
  },

  getById: async (id: string) => {
    const docRef = doc(db, "staff", id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  update: async (id: string, data: any) => {
    await updateDocument("staff", id, data);
  },

  delete: async (id: string) => {
    await deleteFirestoreDocument("staff", id);
  },

  listenAll: (callback: (data: any[]) => void) => {
    return getACollection("users", (data) => {
      const filtered = data.filter((item: any) => item.role !== "admin");
      callback(filtered);
    });
  },
};
