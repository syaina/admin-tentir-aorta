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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector } from "react-redux";

export default function Soal() {
  const soal = useSelector((state) => state.fiturSoal.soal);

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
            Tambah Soal
          </Button>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Materi</TableCell>
                  <TableCell align="center">Bab</TableCell>
                  <TableCell align="left">Soal</TableCell>
                  <TableCell align="left">Pilihan</TableCell>
                  <TableCell align="center">Jawaban</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {soal.map((item) => (
                  <TableRow key={item.id_soal}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">{item.id_materi}</TableCell>
                    <TableCell align="center">{item.id_bab}</TableCell>
                    <TableCell align="left" style={{ maxWidth: 300 }}>
                      {item.url_gambar && (
                        <div style={{ widht: "100%" }}>
                          <img
                            src={item.url_gambar}
                            style={{ height: 50, margin: "auto" }}
                          />
                        </div>
                      )}
                      <br />
                      {item.soal}
                    </TableCell>
                    <TableCell align="left">
                      <p>A. {item.pil1}</p>
                      <p>B. {item.pil2}</p>
                      <p>C. {item.pil3}</p>
                      <p>D. {item.pil4}</p>
                      <p>E. {item.pil5}</p>
                    </TableCell>
                    <TableCell align="center">
                      {item.jawaban.toUpperCase()}
                    </TableCell>
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
        </>
      }
    />
  );
}
