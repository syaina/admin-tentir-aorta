import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

export default function ConfirmDialog({
  children,
  title,
  onCancelClick,
  onConfirmClick,
  onCloseClick,
}) {
  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => onCloseClick()}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onCancelClick()}
        >
          Kembali
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onConfirmClick()}
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}
