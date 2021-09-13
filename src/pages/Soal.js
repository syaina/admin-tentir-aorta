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
import { postWithAuth } from "../services/axios/post";

export default function Soal() {
  const soal = useSelector((state) => state.fiturSoal.soal);
  const bab = useSelector((state) => state.fiturSoal.bab);

  const [dialogOpen, setDialogOpen] = useState(false);
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
  const [file, setFile] = useState();

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

  return (
    <MainContainer>
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
    </MainContainer>
  );
}
