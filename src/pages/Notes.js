import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Notes = ({user}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const notesCollection = collection(db, "notes");

  const getNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("user", "==", user.email)
    );

    const snapshot = await getDocs(q);
    const filteredDocuments = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNotes(filteredDocuments);
  };

  return (
    <section>
      <h1>Notes</h1>
      <ul>
        {notes.map((doc) => (
          <li key={doc.id}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notes;
