import {} from "react-jwt";
import {} from "react-redux";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import {} from "./component/0.Store/comp";
import SideBar from "./component/1.SideBar";
import { dataAdmin } from "./component/1.SideBar/dataSidebar";
import LoginPage from "./component/pages/7.login";
import PageNotFound from "./component/pages/9.pageNotFound";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        {dataAdmin.map((data, index) => (
          <Route
            key={index}
            path={data.path}
            element={<SideBar>{data.element}</SideBar>}
          />
        ))}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
