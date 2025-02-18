export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("QuizDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("quizHistory")) {
        db.createObjectStore("quizHistory", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveQuizAttempt = async (quizData) => {
  const db = await openDB();
  const transaction = db.transaction("quizHistory", "readwrite");
  const store = transaction.objectStore("quizHistory");
  return new Promise((resolve, reject) => {
    const request = store.add(quizData);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getQuizHistory = async () => {
  const db = await openDB();
  const transaction = db.transaction("quizHistory", "readonly");
  const store = transaction.objectStore("quizHistory");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
