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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector } from "react-redux";
import FormDialog from "../components/FormDialog";
import UploadFile from "../components/UploadFile";
import { postWithAuth } from "../services/axios/post";

export default function Bab() {
  const bab = useSelector((state) => state.fiturSoal.bab);
  const materi = useSelector((state) => state.fiturSoal.materi);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [judul, setJudul] = useState();
  const [idMateri, setIdMateri] = useState();
  const [file, setFile] = useState();

  async function postData(data) {
    try {
      const res = await postWithAuth("/bab/insert", data);
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("judul_bab", judul);
    formData.append("id_materi", idMateri);
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
              id="judul_bab"
              label="Judul Bab"
              name="judul_bab"
              size="small"
              onChange={(e) => setJudul(e.target.value)}
            />
            <FormControl
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Materi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={idMateri}
                onChange={(e) => setIdMateri(e.target.value)}
                label="Materi"
              >
                {materi.map((materi) => (
                  <MenuItem value={materi.id_materi}>
                    {materi.judul_materi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
        Tambah Bab
      </Button>

      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Judul Bab</TableCell>
              <TableCell align="center">Materi</TableCell>
              <TableCell align="center">Thumbnail</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bab.map((item) => (
              <TableRow key={item.id_bab}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.judul_bab}</TableCell>
                <TableCell align="center">{item.id_materi}</TableCell>
                <TableCell align="center">
                  <img src={item.url_gambar} style={{ height: 50 }} />
                </TableCell>
                <TableCell align="center">
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
