import React, { useState } from "react";
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

export default function Soal() {
  const soal = useSelector((state) => state.fiturSoal.soal);
  const bab = useSelector((state) => state.fiturSoal.bab);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [file, setFile] = useState();
  const [newSoal, setSoal] = useState({
    id_bab: "",
    soal: "",
    pil1: "",
    pil2: "",
    pil3: "",
    pil4: "",
    pil5: "",
    jawaban: "",
    pembahasan: "",
  });
  const [editData, setEditData] = useState({
    id_bab: "",
    soal: "",
    pil1: "",
    pil2: "",
    pil3: "",
    pil4: "",
    pil5: "",
    jawaban: "",
    pembahasan: "",
  });

  const [selectedId, setSelectedId] = useState();

  async function postData(data) {
    try {
      const res = await postWithAuth("/soal/insert", data);
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id_bab", newSoal.id_bab);
    formData.append("soal", newSoal.soal);
    formData.append("pil1", newSoal.pil1);
    formData.append("pil2", newSoal.pil2);
    formData.append("pil3", newSoal.pil3);
    formData.append("pil4", newSoal.pil4);
    formData.append("pil5", newSoal.pil5);
    formData.append("jawaban", newSoal.jawaban);
    formData.append("pembahasan", newSoal.pembahasan);
    file
      ? formData.append("url_gambar", file)
      : formData.append("url_gambar", null);
    postData(formData);
  };

  const openEditDialog = (id) => {
    setEditDialogOpen(true);
    setEditData({ ...editData, id_soal: id });
    async function getDetailData() {
      try {
        const res = await getWithAuth(`/soal/id/${id}`);
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
    formUpdateData.append("id_soal", selectedId);
    formUpdateData.append("id_bab", editData.id_bab);
    formUpdateData.append("soal", editData.soal);
    formUpdateData.append("pil1", editData.pil1);
    formUpdateData.append("pil2", editData.pil2);
    formUpdateData.append("pil3", editData.pil3);
    formUpdateData.append("pil4", editData.pil4);
    formUpdateData.append("pil5", editData.pil5);
    formUpdateData.append("jawaban", editData.jawaban);
    formUpdateData.append("pembahasan", editData.pembahasan);
    file
      ? formUpdateData.append("url_gambar", file)
      : formUpdateData.append("url_gambar", null);

    async function updateData(data) {
      try {
        const res = await postWithAuth("/soal/update", data);
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
      const result = await deleteWithAuth("/soal/delete", {
        id_soal: selectedId,
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
          title="Tambah Soal"
          button="Tambah"
          dialogOpen={dialogOpen}
          onButtonClick={() => handleSubmit()}
          onCloseClick={() => setDialogOpen(false)}
        >
          <form noValidate onSubmit={(e) => e.preventDefault()}>
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
                value={soal.id_bab}
                onChange={(e) =>
                  setSoal({ ...newSoal, id_bab: e.target.value })
                }
                label="Materi"
              >
                {bab.map((bab) => (
                  <MenuItem value={bab.id_bab}>{bab.judul_bab}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="soal"
              label="Soal"
              name="soal"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, soal: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="a"
              label="Option A"
              name="a"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, pil1: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="b"
              label="Option B"
              name="b"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, pil2: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="c"
              label="Option C"
              name="c"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, pil3: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="d"
              label="Option D"
              name="d"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, pil4: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="e"
              label="Option E"
              name="e"
              size="small"
              onChange={(e) => setSoal({ ...newSoal, pil5: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="jawaban"
              label="Kunci Jawaban"
              name="jawaban"
              size="small"
              onChange={(e) =>
                setSoal({ ...newSoal, jawaban: e.target.value.toLowerCase() })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="pembahasan"
              label="Pembahasan"
              name="pembahasan"
              size="small"
              onChange={(e) =>
                setSoal({ ...newSoal, pembahasan: e.target.value })
              }
            />

            <UploadFile parentCallback={(file) => setFile(file)} />
          </form>
        </FormDialog>
      )}

      {editDialogOpen && (
        <FormDialog
          title="Edit Soal"
          button="Tambah"
          dialogOpen={editDialogOpen}
          onButtonClick={() => handleUpdate()}
          onCloseClick={() => setEditDialogOpen(false)}
        >
          <form noValidate onSubmit={(e) => e.preventDefault()}>
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
                value={editData.id_bab}
                onChange={(e) =>
                  setEditData({ ...editData, id_bab: e.target.value })
                }
                label="Materi"
              >
                {bab.map((bab) => (
                  <MenuItem value={bab.id_bab}>{bab.judul_bab}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="soal"
              label="Soal"
              name="soal"
              size="small"
              value={editData.soal}
              onChange={(e) =>
                setEditData({ ...editData, soal: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="a"
              label="Option A"
              name="a"
              size="small"
              value={editData.pil1}
              onChange={(e) =>
                setEditData({ ...editData, pil1: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="b"
              label="Option B"
              name="b"
              size="small"
              value={editData.pil2}
              onChange={(e) =>
                setEditData({ ...editData, pil2: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="c"
              label="Option C"
              name="c"
              size="small"
              value={editData.pil3}
              onChange={(e) =>
                setEditData({ ...newSoal, pil3: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="d"
              label="Option D"
              name="d"
              size="small"
              value={editData.pil4}
              onChange={(e) =>
                setEditData({ ...editData, pil4: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="e"
              label="Option E"
              name="e"
              size="small"
              value={editData.pil5}
              onChange={(e) =>
                setEditData({ ...editData, pil5: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="jawaban"
              label="Kunci Jawaban"
              name="jawaban"
              size="small"
              value={editData.jawaban}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  jawaban: e.target.value.toLowerCase(),
                })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="pembahasan"
              label="Pembahasan"
              name="pembahasan"
              size="small"
              value={editData.pembahasan}
              onChange={(e) =>
                setEditData({ ...editData, pembahasan: e.target.value })
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
                <TableCell align="left">{item.judul_materi}</TableCell>
                <TableCell align="center">{item.judul_bab}</TableCell>
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openEditDialog(item.id_soal)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => openDeleteDialog(item.id_soal)}
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
