
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const saveOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (err) {
    console.error("Failed to save order:", err);
    return null;
  }
};
