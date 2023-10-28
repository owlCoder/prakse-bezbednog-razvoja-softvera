import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import Profile from "./components/profile/Profile";
import ForgotPassword from "./components/accounts/ForgotPassword";
// @ts-ignore
import Home from './components/main/Home';

// Error pages
import Error400Page from "./components/errorPages/error400";
import Error401Page from "./components/errorPages/error401";
import Error403Page from "./components/errorPages/error403";
import Error404Page from "./components/errorPages/error404";
import Error500Page from "./components/errorPages/error500";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/homepage" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/account-settings" element={<Profile />} />

          <Route exact path="/400" element={<Error400Page />} />
          <Route exact path="/401" element={<Error401Page />} />
          <Route exact path="/403" element={<Error403Page />} />
          <Route exact path="/404" element={<Error404Page />} />
          <Route exact path="/500" element={<Error500Page />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;