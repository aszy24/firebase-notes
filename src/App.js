import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

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

  if (isLoading)
    return (
  <div id="loader">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      </div>
    );

  return (
    <div className="App">
      <nav>
        <ul>
          {user === null ? (
            <li onClick={signInWithGoogle}>Sign in with Google</li>
          ) : (
            <>
              <li>
                <a href="/notes">notes</a>
              </li>
              <li>
                <a href="/profile">
                  <img src={user.photoURL} alt="Profile" />
                </a>
              </li>
              <li onClick={() => auth.signOut()}>Sign out</li>
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
            element={
              user === null ? <Navigate to="/login" /> : <Profile user={user} />
            }
          />
          <Route
            path="/notes"
            element={
              user === null ? <Navigate to="/login" /> : <Notes user={user} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
