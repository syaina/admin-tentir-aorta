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
import { setCustomer } from "../store/actions/customerAction";

export default function Customer() {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customer.customer);
  async function getCustomers() {
    try {
      const res = await getWithAuth("/user");
      console.log(res);
      dispatch(setCustomer(res.data.results));
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    getCustomers();
  }, [dispatch]);

  return (
    <MainContainer>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nama</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Pekerjaan</TableCell>
              <TableCell align="center">Asal Universitas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.data.map((item) => (
              <TableRow key={item.id_pengajar}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.nama}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.pekerjaan}</TableCell>
                <TableCell align="center">{item.asal_universitas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
