import React, { useState, useEffect } from "react";
import MainContainer from "../containers/MainContainer";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector, useDispatch } from "react-redux";
import { getWithAuth } from "../services/axios/get";
import { setOrder } from "../store/actions/orderAction";

export default function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.order);

  async function getOrders() {
    try {
      const res = await getWithAuth("/booking");
      if (res.status == 200) {
        dispatch(setOrder(res.data.results));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, [dispatch]);

  return (
    <MainContainer>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="center">No. Handphone</TableCell>
              <TableCell align="center">Produk</TableCell>
              <TableCell align="center">Tanggal</TableCell>
              <TableCell align="center">Bukti Transfer</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <TableRow key={item.id_pengajar}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.id_user}</TableCell>
                <TableCell align="center">{item.no_handphone}</TableCell>
                <TableCell align="center">
                  {item.id_produk === "other"
                    ? `Lainnya: ${item.other_produk}`
                    : item.id_produk}
                </TableCell>
                <TableCell align="center">{item.tanggal}</TableCell>
                <TableCell align="center">
                  <img src={item.bukti_transfer} style={{ height: 50 }} />
                </TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center" style={{ maxWidth: 155 }}>
                  <Button size="small" color="primary">
                    <EditIcon />
                  </Button>
                  <Button size="small" color="secondary">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
