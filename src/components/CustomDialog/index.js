import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flex1: {
    flex: 1,
  },
  close: {
    cursor: "pointer",
    position: "absolute",
    top: "30px",
    right: "0%",
    padding: "12px 16px",
    transform: "translate(0%, -50%)",
    fontSize: "32px",
    color: "#9C1304",
  },
  headerText: {
    "& h2": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem",
      },
    },
  },
}));

function CustomDialog(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container>
          <Grid item className={classes.flex1}>
            <DialogTitle className={classes.headerText} id="title">
              {props.dialogTitle}
            </DialogTitle>
          </Grid>
          <Grid container item justify="flex-end">
            <Typography
              className={classes.close}
              onClick={props.handleClose}
              variant="body1"
            >
              &times;
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <DialogContent>
          <DialogContentText>{props.children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomDialog;
