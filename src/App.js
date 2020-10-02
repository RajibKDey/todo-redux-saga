import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  Button,
  Icon,
  TextField,
} from "@material-ui/core";
import ToDoCard from "./components/ToDoCard";
import CustomDialog from "./components/CustomDialog";
import classnames from "classnames";
import "./App.css";
import ToDoCreate from "./screens/ToDoCreate";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  basePadding: {
    padding: theme.spacing(2),
  },
  paperDimension: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#696969",
  },
  buttonIcon: {
    fontSize: "30px",
    paddingTop: "3px",
  },
  paddingRightIcon: {
    paddingRight: theme.spacing(1),
  },
  flex1: {
    flex: 1,
  },
  marginRightItem: {
    marginRight: theme.spacing(4),
  },
  textFieldWidth: {
    width: "200px",
  },
  filter: {
    backgroundColor: "#DCDCDC",
    padding: "0px 15px",
    borderRadius: "4px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  },
  fontWhite: {
    color: "white",
  },
  cursor: {
    cursor: "pointer",
  },
  item: {
    boxSizing: "border-box",
    padding: "5px",
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.todo.data);

  useEffect(() => {}, []);

  const [openPopup, setOpenPopup] = useState(false);
  const addToDo = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const [filterValue, setFilterValue] = useState("none");
  const filterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    let tempData = [];
    if (filterValue !== "none" && data.length > 0) {
      data.forEach((row) => {
        if (row.severity === filterValue) {
          tempData.push(row);
        }
      });
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    let tempData = [];
    if (filterValue !== "none" && data.length > 0) {
      data.forEach((row) => {
        if (row.severity === filterValue) {
          tempData.push(row);
        }
      });
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  }, [filterValue]);

  return (
    <>
      <Paper
        elevation={0}
        className={classnames(classes.paperDimension, classes.basePadding)}
      >
        <Grid container justify="center" className={classes.basePadding}>
          <Typography variant="h3" className={classes.fontWhite}>
            <b>To-Do List</b>
          </Typography>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.basePadding}
        >
          <Grid item lg={4}>
            <Typography variant="h5" className={classes.fontWhite}>
              <b>To-Do Area</b>
            </Typography>
          </Grid>
          <Grid item className={classes.flex1}>
            <Grid container justify="flex-end" alignItems="center">
              <Grid
                item
                className={classnames(classes.marginRightItem, classes.filter)}
              >
                <Grid container alignItems="center">
                  <Grid item className={classes.paddingRightIcon}>
                    <Typography variant="h6">
                      <b>Filter :</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.textFieldWidth}
                      select
                      margin="dense"
                      variant="outlined"
                      name="filter"
                      value={filterValue}
                      onChange={filterChange}
                      placeholder="Filter By Importance"
                    >
                      <option
                        className={classnames(
                          classes.basePadding,
                          classes.cursor
                        )}
                        value={"none"}
                      >
                        None
                      </option>
                      <option
                        className={classnames(
                          classes.basePadding,
                          classes.cursor
                        )}
                        value={"success"}
                      >
                        Success
                      </option>
                      <option
                        className={classnames(
                          classes.basePadding,
                          classes.cursor
                        )}
                        value={"warning"}
                      >
                        Warning
                      </option>
                      <option
                        className={classnames(
                          classes.basePadding,
                          classes.cursor
                        )}
                        value={"error"}
                      >
                        Error
                      </option>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={addToDo}>
                  <Grid container alignItems="center">
                    <Grid item className={classes.paddingRightIcon}>
                      <Icon className={classes.buttonIcon}>add</Icon>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Add</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          {filteredData &&
            filteredData.map((item) => (
              <Grid item lg={4} className={classes.item}>
                <ToDoCard key={item.id} data={item} />
              </Grid>
            ))}
        </Grid>
      </Paper>
      <CustomDialog
        dialogTitle={"Create To-Do"}
        handleClose={handleClose}
        open={openPopup}
        maxWidth={"sm"}
      >
        <ToDoCreate />
      </CustomDialog>
    </>
  );
}

export default App;
