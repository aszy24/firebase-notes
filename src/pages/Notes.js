import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Notes = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setnewNoteDescription] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const notesCollection = collection(db, "notes");

  const createNote = async () => {
    await addDoc(notesCollection, {
      user: user.email,
      title: newNoteTitle,
      description: newNoteDescription,
    });
    setNewNoteTitle("");
    setnewNoteDescription("");
    getNotes();
  };

  const getNotes = async () => {
    const q = query(collection(db, "notes"), where("user", "==", user.email));

    const snapshot = await getDocs(q);
    const filteredDocuments = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNotes(filteredDocuments);
  };

  const deleteNote = async (id) => {
    const selectedNote = doc(db, "notes", id);
    await deleteDoc(selectedNote);
    getNotes();
  };

  return (
    <section>
      <h1>Notes</h1>
      <div>
        <input
          type="text"
          placeholder="title..."
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="description..."
          value={newNoteDescription}
          onChange={(e) => setnewNoteDescription(e.target.value)}
        />
      </div>
      <button onClick={createNote}>Add new Note</button>
      <ul class="notes">
        {notes.map((doc) => (
          <li class="note" key={doc.id}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <button onClick={() => deleteNote(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notes;
