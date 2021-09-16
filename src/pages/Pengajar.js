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
import { postWithAuth, deleteWithAuth } from "../services/axios/post";
import { getWithAuth } from "../services/axios/get";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Pengajar() {
  const pengajar = useSelector((state) => state.pengajar.pengajar);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [nama, setNama] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [file, setFile] = useState();

  const [selectedId, setSelectedId] = useState();

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

  const [editData, setEditData] = useState({
    id_pengajar: "",
    nama: "",
    deskripsi: "",
    url_gambar: "",
  });

  const openEditDialog = (id) => {
    setEditDialogOpen(true);
    setEditData({ ...editData, id_pengajar: id });
    async function getDetailData() {
      try {
        const res = await getWithAuth(`/pengajar/id/${id}`);
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
    formUpdateData.append("id_pengajar", editData.id_pengajar);
    formUpdateData.append("nama", editData.nama);
    formUpdateData.append("deskripsi", editData.deskripsi);
    formUpdateData.append("url_gambar", editData.url_gambar);

    async function updateData(data) {
      try {
        const res = await postWithAuth("/pengajar/update", data);
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
      const result = await deleteWithAuth("/pengajar/delete", {
        id_pengajar: selectedId,
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

      {editDialogOpen && (
        <FormDialog
          title="Edit Pengajar"
          button="Edit"
          dialogOpen={dialogOpen}
          onButtonClick={() => handleUpdate()}
          onCloseClick={() => setEditDialogOpen(false)}
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
              value={editData.nama}
              onChange={(e) =>
                setEditData({ ...editData, nama: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="deskripsi"
              label="Deskripsi"
              name="deskripsi"
              size="small"
              value={editData.deskripsi}
              onChange={(e) =>
                setEditData({ ...editData, deskripsi: e.target.value })
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openEditDialog(item.id_pengajar)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => openDeleteDialog(item.id_pengajar)}
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
