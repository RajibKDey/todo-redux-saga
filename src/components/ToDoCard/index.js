import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Icon,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteToDo } from "../../services/createToDo/action";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  basePadding: {
    padding: theme.spacing(2),
  },
  flex1: {
    flex: 1,
  },
  card: {
    boxSizing: "border-box",
    padding: "5px",
    width: "100%",
    height: "100%",
  },
  capitalize: {
    texTransform: "capitalize",
  },
  green: {
    borderLeft: "5px solid #008000",
  },
  orange: {
    borderLeft: "5px solid #FFA500",
  },
  red: {
    borderLeft: "5px solid #FF0000",
  },
}));

export default function ToDoCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteToDo(props.data.id));
  };

  let flagGreen = false,
    flagOrange = false,
    flagRed = false;
  if (props.data.severity === "success") {
    flagGreen = true;
  } else if (props.data.severity === "warning") {
    flagOrange = true;
  } else {
    flagRed = true;
  }

  return (
    <Card
      className={classnames(
        classes.card,
        { [classes.green]: flagGreen },
        { [classes.orange]: flagOrange },
        { [classes.red]: flagRed }
      )}
    >
      <CardHeader
        title={
          <Grid container alignItems="center">
            <Grid item className={classes.flex1}>
              <Typography variant="h6">
                <b>{props.data.title.toString().toUpperCase()}</b>
              </Typography>
            </Grid>
            <Grid item className={classes.flex1}>
              <Grid container justify="flex-end">
                <IconButton onClick={handleDelete}>
                  <Icon>delete</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        }
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Typography variant="subtitle1">
            {"Date: " + props.data.date}
          </Typography>
        </Grid>
        <Grid container>
          <Typography variant="subtitle2" className={classes.capitalize}>
            {"Message: " + props.data.message}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
