import React, { useState } from "react";
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

import { useSelector } from "react-redux";
import FormDialog from "../components/FormDialog";
import UploadFile from "../components/UploadFile";
import { postWithAuth } from "../services/axios/post";

export default function Pengajar() {
  const pengajar = useSelector((state) => state.pengajar.pengajar);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nama, setNama] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [file, setFile] = useState();

  async function postData(data) {
    try {
      const res = await postWithAuth("/pengajar/insert", data);
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("url_gambar", file);
    postData(formData);
  };

  return (
    <MainContainer>
      {dialogOpen && (
        <FormDialog
          title="Tambah Pengajar"
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
              id="nama"
              label="Nama Pengajar"
              name="nama"
              size="small"
              onChange={(e) => setNama(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="deskripsi"
              label="Deskripsi"
              name="deskripsi"
              size="small"
              onChange={(e) => setDeskripsi(e.target.value)}
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
              <TableCell align="left">Nama Pengajar</TableCell>
              <TableCell align="left">Deskripsi</TableCell>
              <TableCell align="center">Thumbnail</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pengajar.map((item) => (
              <TableRow key={item.id_pengajar}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.nama}</TableCell>
                <TableCell align="left">{item.deskripsi}</TableCell>
                <TableCell align="center">
                  <img src={item.url_gambar} style={{ height: 50 }} />
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
    </MainContainer>
  );
}
