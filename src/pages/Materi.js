import React, { useEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
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
import FormDialog from "../components/FormDialog";

import { useSelector } from "react-redux";
import UploadFile from "../components/UploadFile";
import { postWithAuth, deleteWithAuth } from "../services/axios/post";
import { getWithAuth } from "../services/axios/get";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Materi() {
  const materi = useSelector((state) => state.fiturSoal.materi);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [judul, setJudul] = useState();
  const [file, setFile] = useState();
  const [selectedId, setSelectedId] = useState();

  const [editData, setEditData] = useState({
    id_materi: "",
    judul_materi: "",
    url_gambar: "",
  });

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

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setConfirmDialogOpen(true);
  };

  const openEditDialog = (id) => {
    setEditDialogOpen(true);
    setEditData({ ...editData, id_materi: id });
    async function getDetailData() {
      try {
        const res = await getWithAuth(`/materi/id/${id}`);
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
    formUpdateData.append("id_materi", editData.id_materi);
    formUpdateData.append("judul_materi", editData.judul_materi);
    formUpdateData.append("url_gambar", editData.url_gambar);

    async function updateData(data) {
      try {
        const res = await postWithAuth("/materi/update", data);
        setEditDialogOpen(false);
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
    updateData(formUpdateData);
  };

  async function deleteData() {
    try {
      const result = await deleteWithAuth("/materi/delete", {
        id_materi: selectedId,
      });
      console.log(result);
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

      {editDialogOpen && (
        <FormDialog
          title="Edit Materi"
          button="Tambah"
          dialogOpen={editDialogOpen}
          onButtonClick={() => handleUpdate()}
          onCloseClick={() => setEditDialogOpen(false)}
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
              value={editData.judul_materi}
              onChange={(e) =>
                setEditData({ ...editData, judul_materi: e.target.value })
              }
            />
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
            {materi.map((item, idx) => (
              <TableRow key={item.id_materi}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="left">{item.judul_materi}</TableCell>
                <TableCell align="center">
                  <img src={item.url_gambar} style={{ height: 50 }} />
                </TableCell>
                <TableCell align="center" style={{ maxWidth: 155 }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openEditDialog(item.id_materi)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => openDeleteDialog(item.id_materi)}
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
