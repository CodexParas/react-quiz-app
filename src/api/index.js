import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { createQuiz } from "../hooks/createQuiz";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userData = userCred?.providerData[0];
        const unsubscribe = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          },
        );
        return unsubscribe;
      } else {
        reject(new Error("User not authenticated"));
      }
      unsubscribe();
    });
  });
};

export const getQuizes = (id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(doc(db, "quizes", id), async (_doc) => {
      if (_doc.exists()) {
        resolve(_doc.data());
      } else {
        const _doc = await createQuiz();
        setDoc(doc(db, "quizes", _doc._id), _doc).then(() => {
          resolve(_doc);
        });
      }
    });
    return unsubscribe;
  });
};
export const getQuestions = () => {
  return new Promise((resolve, reject) => {
    const quizQuery = query(
      collection(db, "questions"),
      orderBy("timeStamp", "asc"),
    );
    const unsubscribe = onSnapshot(quizQuery, (querySnapshot) => {
      const questions = querySnapshot.docs.map((doc) => doc.data());
      resolve(questions);
    });
    return unsubscribe;
  });
};

export const getTemplateDetails = async (id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(doc(db, "templates", id), (doc) => {
      resolve(doc.data());
    });
    return unsubscribe;
  });
};
