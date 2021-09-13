import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import StarIcon from "@material-ui/icons/Star";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle } from "../store/actions/globalAction";

export default function Menu() {
  const history = useHistory();
  const dispatch = useDispatch();

  const routeChange = (path, title) => {
    history.push(path);
    dispatch(setTitle(title));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <>
      <List>
        <ListItem
          button
          onClick={() => routeChange("/admin/dashboard", "Dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => routeChange("/admin/orders", "Order")}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem
          button
          onClick={() => routeChange("/admin/customer", "Customer")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>

        <ListItem
          button
          onClick={() => routeChange("/admin/pengajar", "Pengajar")}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Pengajar" />
        </ListItem>

        <ListItem button onClick={() => routeChange("/admin/produk", "Produk")}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Produk" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListSubheader inset>Fitur Soal</ListSubheader>
        <ListItem button onClick={() => routeChange("/admin/materi", "Materi")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Materi" />
        </ListItem>
        <ListItem button onClick={() => routeChange("/admin/bab", "Bab")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Bab" />
        </ListItem>
        <ListItem button onClick={() => routeChange("/admin/soal", "Soal")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Soal" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
}
