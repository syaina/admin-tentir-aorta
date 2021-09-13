import React, { useEffect, useState } from "react";
import MainContainer from "../../containers/MainContainer";
import {
  Button,
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
import FormDialog from "../../components/FormDialog";

import { useSelector } from "react-redux";
import UploadFile from "../../components/UploadFile";
import { postWithAuth } from "../../services/axios/post";

export default function Materi() {
  const materi = useSelector((state) => state.fiturSoal.materi);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [judul, setJudul] = useState();
  const [file, setFile] = useState();

  async function postData(data) {
    try {
      const res = await postWithAuth("/materi/insert", data);
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("judul_materi", judul);
    formData.append("url_gambar", file);
    postData(formData);
  };

  return (
    <MainContainer>
      {dialogOpen && (
        <FormDialog
          title="Tambah Materi"
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
              id="judul_materi"
              label="Judul Materi"
              name="judul_materi"
              size="small"
              onChange={(e) => setJudul(e.target.value)}
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
        Tambah Materi
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