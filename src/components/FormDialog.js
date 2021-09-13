import React, { useState, useEffect } from "react";
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

export default function FormDialog({
  children,
  title,
  button,
  onButtonClick,
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
      <DialogContent>
        <Typography>{children}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onButtonClick()}
        >
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
