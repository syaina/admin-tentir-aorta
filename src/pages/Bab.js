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
import { postWithAuth, deleteWithAuth } from "../services/axios/post";
import { getWithAuth } from "../services/axios/get";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Bab() {
  const bab = useSelector((state) => state.fiturSoal.bab);
  const materi = useSelector((state) => state.fiturSoal.materi);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [judul, setJudul] = useState();
  const [idMateri, setIdMateri] = useState();
  const [file, setFile] = useState();

  const [selectedId, setSelectedId] = useState();

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

  const [editData, setEditData] = useState({
    id_materi: "",
    id_bab: "",
    judul_bab: "",
    url_gambar: "",
  });

  const openEditDialog = (id) => {
    setEditDialogOpen(true);
    setEditData({ ...editData, id_bab: id });
    async function getDetailData() {
      try {
        const res = await getWithAuth(`/bab/id/${id}`);
        setEditData({ ...editData, ...res.data.results });
        console.log(editData);
      } catch (error) {
        alert(error);
      }
    }
    getDetailData();
  };

  const handleUpdate = () => {
    const formUpdateData = new FormData();
    formUpdateData.append("id_bab", editData.id_bab);
    formUpdateData.append("id_materi", editData.id_materi);
    formUpdateData.append("judul_bab", editData.judul_bab);
    formUpdateData.append("url_gambar", editData.url_gambar);

    async function updateData(data) {
      try {
        const res = await postWithAuth("/bab/update", data);
        setEditDialogOpen(false);
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
    updateData(formUpdateData);
  };

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setConfirmDialogOpen(true);
  };

  async function deleteData() {
    try {
      const result = await deleteWithAuth("/bab/delete", {
        id_bab: selectedId,
      });
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleDeleteData = () => {
    deleteData();
  };

  return (
    <MainContainer>
      {confirmDialogOpen && (
        <ConfirmDialog
          title="Hapus"
          dialogOpen={confirmDialogOpen}
          onCloseClick={() => setConfirmDialogOpen(false)}
          onCancelClick={() => setConfirmDialogOpen(false)}
          onConfirmClick={() => handleDeleteData()}
        >
          Anda yakin untuk menghapus data ini?
        </ConfirmDialog>
      )}
      {dialogOpen && (
        <FormDialog
          title="Tambah Bab"
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
      {editDialogOpen && (
        <FormDialog
          title="Edit Bab"
          button="Tambah"
          dialogOpen={dialogOpen}
          onButtonClick={() => handleUpdate()}
          onCloseClick={() => setEditDialogOpen(false)}
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
              value={editData.judul_bab}
              onChange={(e) =>
                setEditData({ ...editData, judul_bab: e.target.value })
              }
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
                onChange={(e) =>
                  setEditData({ ...editData, id_materi: e.target.value })
                }
                label="Materi"
              >
                {materi.map((materi) => (
                  <MenuItem value={materi.id_materi}>
                    {materi.judul_materi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <UploadFile
              parentCallback={(file) =>
                setEditData({ ...editData, url_gambar: file })
              }
            />
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
                <TableCell align="center">{item.judul_materi}</TableCell>
                <TableCell align="center">
                  <img src={item.url_gambar} style={{ height: 50 }} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openEditDialog(item.id_bab)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => openDeleteDialog(item.id_bab)}
                  >
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
