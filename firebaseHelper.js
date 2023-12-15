import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export async function newUserData(user) {
  var date = new Date();
  const data = {
    name: user.email,
    proteinMax: 0,
    proteinCurr: 0,
    lastSignedIn: date.getDay(),
  };
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", user.uid), data);
    return false;
  } else {
    return true;
  }
}

export async function updateUserData(user, data) {
  const docRef = doc(db, "users", user.uid);
  await updateDoc(docRef, data);
}

export async function getData(user) {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
