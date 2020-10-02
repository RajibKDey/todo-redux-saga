import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Paper,
  Button,
  Select,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import moment from "moment";
import { createToDo, resetToDo } from "../../services/createToDo/action";

const useStyles = makeStyles((theme) => ({
  basePadding: {
    padding: theme.spacing(2),
  },
  cursor: {
    cursor: "pointer",
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function ToDoCreate() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const ToDo = (values) => {
    let toDo = values;
    toDo.id = Date.now();
    dispatch(createToDo(toDo));
  };

  const code = useSelector((state) => state.todo.code);

  useEffect(() => {
    if (code) {
      dispatch(resetToDo());
    }
  }, [code]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          date: moment().format("YYYY-MM-DD"),
          severity: "success",
          message: "",
          id: "",
        }}
        onSubmit={(values, event) => {
          ToDo(values);
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Required"),
          message: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item lg={12} className={classes.paddingBottom}>
                  <TextField
                    id="title"
                    name="title"
                    error={errors.title && touched.title}
                    value={values.title}
                    onChange={(e) => {
                      handleChange(e);
                      e.target.value === " " && setFieldValue("title", "");
                    }}
                    onBlur={handleBlur}
                    helperText={errors.title && touched.title && errors.title}
                    label="Title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12} className={classes.paddingBottom}>
                  <Grid container alignItems="center">
                    <Grid item lg={6}>
                      <FormControl variant="outlined" className={classes.width}>
                        <InputLabel ref={inputLabel} htmlFor="severity">
                          severity
                        </InputLabel>
                        <Select
                          native
                          name="severity"
                          className={classes.textFieldWidth}
                          error={errors.severity && touched.severity}
                          value={values.severity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.severity &&
                            touched.severity &&
                            errors.severity
                          }
                          labelWidth={labelWidth}
                          required
                          inputProps={{
                            name: "severity",
                            id: "severity",
                          }}
                        >
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
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        defaultValue={moment().format("YYYY-MM-DD")}
                        InputProps={{
                          inputProps: {
                            min: moment().format("YYYY-MM-DD"),
                          },
                        }}
                        error={errors.date && touched.date}
                        onChange={(event) =>
                          setFieldValue(
                            "date",
                            moment(event.target.value).format("DD-MM-YYYY")
                          )
                        }
                        onBlur={handleBlur}
                        helperText={errors.date && touched.date && errors.date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} className={classes.paddingBottom}>
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    error={errors.message && touched.message}
                    value={values.message}
                    onChange={(e) => {
                      handleChange(e);
                      e.target.value === " " && setFieldValue("message", "");
                    }}
                    onBlur={handleBlur}
                    helperText={
                      errors.message && touched.message && errors.message
                    }
                    label="Message"
                    multiline
                    rows="3"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
