import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <button>Sign in with Google</button>
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
            <button>Sign out</button>
          </li>
        </ul>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element="login"/>
          <Route path="/profile" element="profile"/>
          <Route path="/notes" element="notes"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
