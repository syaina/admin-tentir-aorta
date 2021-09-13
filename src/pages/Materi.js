import React, { useEffect } from "react";
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
} from "@material-ui/core";

import { useSelector } from "react-redux";

export default function Materi() {
  const materi = useSelector((state) => state.fiturSoal.materi);

  return (
    <MainContainer
      content={
        <>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            style={{ marginBottom: 20 }}
          >
            Tambah Bab
          </Button>

          <TableContainer component={Paper}>
            <Table style={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Judul Materi</TableCell>
                  <TableCell align="center">Thumbnail</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materi.map((item) => (
                  <TableRow key={item.id_materi}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">{item.judul_materi}</TableCell>
                    <TableCell align="center">
                      <img src={item.url_gambar} style={{ height: 50 }} />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                      <Button size="small" color="secondary">
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
}
