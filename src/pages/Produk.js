import React, { useState } from "react";
import MainContainer from "../containers/MainContainer";
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

import { useSelector } from "react-redux";
import FormDialog from "../components/FormDialog";
import UploadFile from "../components/UploadFile";
import { postWithAuth } from "../services/axios/post";

export default function Produk() {
  const produk = useSelector((state) => state.produk.produk);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [namaProduk, setNamaProduk] = useState();
  const [waktu, setWaktu] = useState();
  const [harga, setHarga] = useState();
  const [file, setFile] = useState();

  async function postData(data) {
    try {
      const res = await postWithAuth("/produk/insert", data);
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("produk", namaProduk);
    formData.append("waktu", waktu);
    formData.append("harga", harga);
    formData.append("url_gambar", file);
    postData(formData);
  };

  return (
    <MainContainer>
      {dialogOpen && (
        <FormDialog
          title="Tambah Produk"
          button="Tambah"
          dialogOpen={dialogOpen}
          onButtonClick={() => handleSubmit()}
          onCloseClick={() => setDialogOpen(false)}
        >
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="produk"
              label="Nama Produk"
              name="produk"
              size="small"
              onChange={(e) => setNamaProduk(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="waktu"
              label="Durasi"
              name="waktu"
              size="small"
              onChange={(e) => setWaktu(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="harga"
              label="Harga"
              name="harga"
              size="small"
              onChange={(e) => setHarga(e.target.value)}
            />

            <UploadFile parentCallback={(file) => setFile(file)} />
          </form>
        </FormDialog>
      )}

      <Button
        size="medium"
        color="primary"
        variant="contained"
        style={{ marginBottom: 20 }}
        onClick={() => setDialogOpen(true)}
      >
        Tambah Pengajar
      </Button>

      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Produk</TableCell>
              <TableCell align="center">Thumbnail</TableCell>
              <TableCell align="center">Waktu</TableCell>
              <TableCell align="center">Harga</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produk.map((item) => (
              <TableRow key={item.id_produk}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.produk}</TableCell>
                <TableCell align="center">
                  <img src={item.url_gambar} style={{ height: 50 }} />
                </TableCell>
                <TableCell align="center">{item.waktu}</TableCell>
                <TableCell align="center">{item.harga}</TableCell>
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
