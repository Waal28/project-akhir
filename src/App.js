import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import SideBar from "./component/1.SideBar";
import Dashboard from "./component/pages/1.Dashboard";
import Busses from "./component/pages/2.Busses";
import RoutesComp from "./component/pages/3.Routes";
import Customers from "./component/pages/4.Customers";
import Bokings from "./component/pages/5.Bokings";
import Seats from "./component/pages/6.Seats";
import LoginPage from "./component/pages/7.login";
import PageNotFound from "./component/pages/8.pageNotFound";

function App() {
  const { login } = useSelector((state) => state.comp);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      console.log("anda berhasil login");
    } else {
      navigate("/login");
    }
  }, [login]);

  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/"
          element={
            <SideBar>
              <Dashboard />
            </SideBar>
          }
        />
        {login ? (
          <Route
            path="/busess"
            element={
              <SideBar>
                <Busses />
              </SideBar>
            }
          />
        ) : null}
        <Route
          path="/routes"
          element={
            <SideBar>
              <RoutesComp />
            </SideBar>
          }
        />
        <Route
          path="/customers"
          element={
            <SideBar>
              <Customers />
            </SideBar>
          }
        />
        <Route
          path="/bokings"
          element={
            <SideBar>
              <Bokings />
            </SideBar>
          }
        />
        <Route
          path="/seats"
          element={
            <SideBar>
              <Seats />
            </SideBar>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
