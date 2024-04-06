import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };


  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </li>
          <li>
            <a href="/notes">notes</a>
          </li>
          <li>
            <a href="/profile">
              <img src="" alt="Profile" />
            </a>
          </li>
          <li>
            <button onClick={() => auth.signOut()}>Sign out</button>
          </li>
        </ul>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
