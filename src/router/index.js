import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { CssBaseline } from "@material-ui/core";
import Dashboard from "../pages/Dashboard";
import TopBar from "../components/TopBar";
import Orders from "../pages/Orders";
import Materi from "../pages/Materi";
import Bab from "../pages/Bab";
import Soal from "../pages/Soal";

import { useDispatch } from "react-redux";
import { getAPI } from "../services/axios/get";
import { setMateri, setBab, setSoal } from "../store/actions/soalAction";

function routes() {
  const dispatch = useDispatch();

  async function getMateri() {
    const res = await getAPI("/materi");
    if (res.status == 200) {
      dispatch(setMateri(res.data.results));
    }
  }

  async function getBab() {
    const res = await getAPI("/bab");
    if (res.status == 200) {
      dispatch(setBab(res.data.results));
    }
  }

  async function getSoal() {
    const res = await getAPI("/soal");
    if (res.status == 200) {
      dispatch(setSoal(res.data.results));
    }
  }

  useEffect(() => {
    getMateri();
    getBab();
    getSoal();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Router>
        <TopBar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/materi" component={Materi} />
        <Route exact path="/bab" component={Bab} />
        <Route exact path="/soal" component={Soal} />
      </Router>
    </div>
  );
}
export default routes;
