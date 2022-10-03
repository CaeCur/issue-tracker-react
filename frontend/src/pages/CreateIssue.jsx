import { useState, useEffect } from "react";
import axios from "axios";
import checkErrorStatus from "../hooks/useToggleErrorStates";

//mui
import Container from "@mui/material/Container";
import { Autocomplete, TextField, Typography, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const users = ["caelanc", "florab"];

// const priorityOptions = ["elective", "important", "urgent"];
const priorityOptions = [
  { id: 0, label: "elective" },
  { id: 1, label: "important" },
  { id: 2, label: "urgent" },
];

export default function NewIssueForm() {
  /*** form state ***/
  //track inputs
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [onVersion, setOnVersion] = useState(""); // we can make the software version a global variable at some point
  const [assignedTo, setAssignTo] = useState(null);
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  //track errors
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [onVersionError, setOnVersionError] = useState(false);
  const [assignToError, setAssignToError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);

  /*** form methods ***/

  const handleSubmit = (e) => {
    e.preventDefault();

    //check for errors
    checkErrorStatus([
      { stateCheck: title, errorState: titleError, errorStateFn: setTitleError },
      { stateCheck: details, errorState: detailsError, errorStateFn: setDetailsError },
      { stateCheck: onVersion, errorState: onVersionError, errorStateFn: setOnVersionError },
      { stateCheck: assignedTo, errorState: assignToError, errorStateFn: setAssignToError },
      { stateCheck: priority, errorState: priorityError, errorStateFn: setPriorityError },
      { stateCheck: dueDate, errorState: dueDateError, errorStateFn: setDueDateError },
    ]);

    if (title && details && onVersion && assignedTo && priority && dueDate) {
      //submit form
      const data = {
        title: title,
        details,
        onVersion,
        assignedTo,
        priority: priority.id,
        dueDate,
        createdBy: "caelanc",
      };

      axios
        .post("/api/issues", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //show error
      console.log("error");
    }
  };

  /*** form render ***/
  return (
    <Container>
      <Typography variant="h6" component={"h2"} color="textSecondary" gutterBottom>
        Create a New Issue
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* title */}
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          margin="dense"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          helperText={titleError ? "Title is required" : ""}
        ></TextField>

        {/* details */}
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          margin="dense"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          helperText={detailsError ? "Details are required" : ""}
        ></TextField>

        {/* on version */}
        <TextField
          onChange={(e) => setOnVersion(e.target.value)}
          label="Version of Software"
          placeholder="1.0.0"
          margin="dense"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={onVersionError}
          helperText={onVersionError ? "Software version is required" : ""}
        ></TextField>

        {/* assign to */}
        <Autocomplete
          options={users}
          value={assignedTo}
          onChange={(e, newValue) => setAssignTo(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assign to"
              margin="dense"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={assignToError}
              helperText={assignToError ? "Issue needs to be assigned to someone" : ""}
            />
          )}
        />

        {/* priority */}
        <Autocomplete
          options={priorityOptions}
          value={priority}
          onChange={(e, newValue) => setPriority(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Priority"
              margin="dense"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={priorityError}
              helperText={priorityError ? "Issue priority is required" : ""}
            />
          )}
        />

        {/* due date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due date"
            inputFormat="dd/MM/yyyy"
            value={dueDate}
            onChange={(newValue) => {
              setDueDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={dueDateError}
                helperText={dueDateError ? "Due date is required" : ""}
              />
            )}
          ></DatePicker>
        </LocalizationProvider>

        {/* submit button */}
        <Button type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </form>
    </Container>
  );
}
