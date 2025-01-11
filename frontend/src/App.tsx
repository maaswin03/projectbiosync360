import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // No need for BrowserRouter or Router import
import Home from "./app/dashboard/Home";
import HealthTracking from "./app/dashboard/HeathTracking";
import Personalizedplans from "./app/dashboard/Personalizedplans";
import { useAuth} from "@clerk/clerk-react";
import Loading from "./components/extracomponents/Loading";
import Login from "./Authentication/Login";
import Userinfo from "./components/extracomponents/Userinfo";
import Resource from "./app/dashboard/Resource";
import Biowear from "./app/Products/BioWear";
import SyncApp from "./app/Products/SyncApp";
import DiseasePrediction from "./app/dashboard/AIDoctor";

export default function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/HealthTracking"
          element={
            <PrivateRoute>
              <HealthTracking />
            </PrivateRoute>
          }
        />

        <Route
          path="/SyncApp"
          element={
            <PrivateRoute>
              <SyncApp/>
            </PrivateRoute>
          }
        />


<Route
          path="/FAQs"
          element={
            <PrivateRoute>
              <Resource />
            </PrivateRoute>
          }
        />

        <Route
          path="/Personalizedplans"
          element={
            <PrivateRoute>
              <Personalizedplans />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Userinfo />
            </PrivateRoute>
          }
        />

        <Route
          path="/biowear"
          element={
            <PrivateRoute>
              <Biowear/>
            </PrivateRoute>
          }
        />


<Route
          path="/diseaseprediction"
          element={
            <PrivateRoute>
              <DiseasePrediction/>
            </PrivateRoute>
          }
        />


        <Route path="'login" element={<Login />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
