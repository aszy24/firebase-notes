import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  if (isLoading) return "loading...";

  return (
    <div className="App">
      <nav>
        <ul>
          {user === null ? (
            <li>
              <button onClick={signInWithGoogle}>Sign in with Google</button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={user === null ? <Login /> : <Navigate to="/profile" />}
          />
          <Route
            path="/profile"
            element={user === null ? <Navigate to="/login" /> : <Profile />}
          />
          <Route
            path="/notes"
            element={user === null ? <Navigate to="/login" /> : <Notes />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
