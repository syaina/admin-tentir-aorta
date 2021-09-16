import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Deposits from "./Deposits";
import Orders from "./Orders";
import MainContainer from "../containers/MainContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Typography variant="h5">Selamat Datang Admin!</Typography>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>Ini Deposit</Paper>
        </Grid> */}
        {/* Recent Orders */}
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>Ini Order</Paper>
        </Grid>*/}
      </Grid>
    </MainContainer>
  );
}
