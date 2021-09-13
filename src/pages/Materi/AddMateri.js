import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MainContainer from "../../containers/MainContainer";
import PaperCard from "../../containers/PaperCard";
import { Grid } from "@material-ui/core";

export default function AddMateri() {
  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <PaperCard>
            <form noValidate onSubmit={(e) => handleSubmit(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              />
            </form>
          </PaperCard>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
