import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import { CssBaseline } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../services/axios/get";
import { setMateri, setBab, setSoal } from "../store/actions/soalAction";
import { setPengajar } from "../store/actions/pengajarAction";
import { setProduk } from "../store/actions/produkAction";
import Login from "../pages/Login";
import TopBar from "../components/TopBar";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Pengajar from "../pages/Pengajar";
import Produk from "../pages/Produk";
import Materi from "../pages/Materi/Materi";
import Bab from "../pages/Bab";
import Soal from "../pages/Soal";
import Customer from "../pages/Customer";

function routes() {
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("isLogin");

  async function getPengajar() {
    const res = await getAPI("/pengajar");
    if (res.status == 200) {
      dispatch(setPengajar(res.data.results));
    }
  }

  async function getProduk() {
    const res = await getAPI("/produk");
    if (res.status == 200) {
      dispatch(setProduk(res.data.results));
    }
  }

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
    getPengajar();
    getProduk();
    getMateri();
    getBab();
    getSoal();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Router>
        <Route exact path="/login" component={Login}>
          {isLogin && <Redirect to="/admin/dashboard" />}
        </Route>
        {isLogin ? (
          <Route path="/admin/">
            <TopBar />
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/orders" component={Orders} />
            <Route exact path="/admin/pengajar" component={Pengajar} />
            <Route exact path="/admin/produk" component={Produk} />
            <Route exact path="/admin/materi" component={Materi} />
            <Route exact path="/admin/bab" component={Bab} />
            <Route exact path="/admin/soal" component={Soal} />
            <Route exact path="/admin/customer" component={Customer} />
          </Route>
        ) : (
          <Redirect to="/login" />
        )}
      </Router>
    </div>
  );
}
export default routes;
