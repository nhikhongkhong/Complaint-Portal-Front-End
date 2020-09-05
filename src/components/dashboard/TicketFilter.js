import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import BarChart from "./Charts/BarChartLastWeek";
//import CardWelcome from "./CardWelcome";
//import CardDate from "./CardDate";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import useStyles from "./Theme";
import MUIDataTable from "mui-datatables";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useContext } from "react";
import { TicketContext } from "../../context";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

import { toast } from "react-toastify";
//import toast from '../../toast';
import "react-toastify/dist/ReactToastify.min.css";

import GenerateData from "../../pages/GenerateData";
import categoryMap from "../Category";
import WarningIcon from "@material-ui/icons/Warning";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// react html email
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
//import htmlToDraft from "html-to-draftjs";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TicketFilter = props => {
  const tickets = useContext(TicketContext).tickets;
  console.log(useContext(TicketContext));
  const investigators = useContext(TicketContext).investigators.map(
    e => e.name
  );

  console.log(investigators);

  const rows = [...tickets];
  const role = props.role;
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2019-10-14T21:11:54")
  // );

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // mui table
  const columns = [
    { name: "Ticket ID", options: { display: false, filter: false } },
    { name: "Content", options: { display: false, filter: false } },
    { name: "Title", options: { filter: false } },
    { name: "Complainant", options: { display: false } },
    { name: "Stakeholder", options: { display: false } },
    { name: "Category" },
    {
      name: "Date Submitted",
      options: { display: true, filter: false }
    },
    { name: "Date Closed", options: { display: false, filter: false } },
    {
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Statuses
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
              row={tableMeta.rowData}
              role={role}
            />
          );
        }
      }
    },
    {
      name: "Severity",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Severity
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
              row={tableMeta.rowData}
              role={role}
            />
          );
        }
      }
    },
    {
      name: "Report",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FileUpload
              value={value}
              index={tableMeta.rowIndex}
              change={event => updateValue(event)}
              row={tableMeta.rowData}
              rawData={rows[tableMeta.rowIndex]}
              role={role}
            />
          );
        }
      }
    },
    {
      name: "Investigator",
      options: {
        filter: true,
        display: role === "admin" ? true : false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Investigator
              investigators={investigators}
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
              row={tableMeta.rowData}
              role={role}
            />
          );
        }
      }
    },
    { name: "Suggestion", options: { display: false, filter: false } },
    {
      name: "Email Options",
      options: {
        display: true,
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <EmailOption
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
              row={tableMeta.rowData}
              role={role}
            />
          );
        }
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    selectableRows: "none", //false,
    expandableRows: true,
    expandableRowsOnClick: false,
    downloadOptions: {
      filename: "GenerateData.csv",
      seperator: ",",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },

    renderExpandableRow: (rowData, rowMeta) => {
      //let colSpan = rowData.length + 1;
      return (
        <>
          <TableRow>
            <TableCell colSpan={1}>
              <h6>Stakeholder</h6>
              <span>{rowData[3]}</span>
            </TableCell>
            <TableCell colSpan={2}>
              <h6>Category</h6>
              <span>{categoryMap.get(rowData[5])}</span>
            </TableCell>
            <TableCell colSpan={3}>
              <h6>Content</h6>
              <span>{rowData[1]}</span>
            </TableCell>
            <TableCell colSpan={3}>
              <h6>Suggestion</h6>
              <span>{rowData[12]}</span>
            </TableCell>
          </TableRow>
        </>
      );
    }
  };
  // console.log(rows[0].report);
  const data = rows
    .reverse()
    .map(row => [
      row._id,
      row.content,
      row.title,
      row.complainantEmail != undefined ? row.complainantEmail.email : "None",
      row.type !== undefined ? row.type : "None",
      row.category,
      row.dateSubmitted.value !== undefined
        ? row.dateSubmitted.value.slice(0, 10).replace(/-/g, "/")
        : "None",
      "",
      row.status,
      row.severityLevel,
      row.report !== undefined ? row.report.name : "No file uploaded",
      row.assignedEmail !== undefined ? row.assignedEmail.name : "",
      row.suggestion,
      row.emailOption != undefined ? row.emailOption.type : "auto"
    ]);

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <CardWelcome user={props.user} role={props.role} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDate />
      </Grid> */}
      <Grid item xs={12} sm={12} md={12}>
        <Paper className={fixedHeightPaper}>
          <BarChart insight={false} data={GenerateData.lastWeek(rows)} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <MUIDataTable
          title={"Tickets"}
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

// Status column
function Statuses(props) {
  const { value, index, change, row, role } = props;
  const statuses =
    role === "admin"
      ? ["invalid", "pending", "on process", "finished", "closed"]
      : ["pending", "on process", "finished"];
  return (
    <FormControl>
      <Select
        value={value}
        onChange={event => {
          const values = {
            id: row[0],
            type: "status",
            value: event.target.value
          };
          if (event.target.value === value) return;
          if (fetchData(values, "status")) change(event.target.value, index);
        }}
        style={{ fontSize: "inherit" }}
      >
        {statuses.map((status, index) =>
          status === "finished" && role === "investigator" ? (
            <MenuItem
              key={index}
              value={status}
              disabled={row[10] === "No file uploaded" ? true : false}
            >
              {status}
            </MenuItem>
          ) : (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}

// Severity column
function Severity(props) {
  const { value, index, change, row, role } = props;
  const severities = ["low", "medium", "high"];
  const icons = severity => {
    if (severity === "low") return <WarningIcon style={{ color: "green" }} />;
    if (severity === "medium")
      return <WarningIcon style={{ color: "orange" }} />;
    if (severity === "high") return <WarningIcon style={{ color: "red" }} />;
  };
  let disable = false;
  // specify category to restric the severity change
  if (
    row[5] === "Stu4" ||
    row[5] === "Sta6" ||
    row[5] === "Sta7" ||
    row[5] === "Sta10" ||
    role === "investigator"
  )
    disable = true;
  return (
    <FormControl disabled={role === "admin" ? false : true}>
      <Select
        value={value}
        disabled={disable}
        onChange={event => {
          const values = {
            id: row[0],
            type: "severity",
            value: event.target.value
          };
          if (event.target.value === value) return;
          if (fetchData(values, "severity")) change(event.target.value, index);
        }}
        style={{ fontSize: "inherit" }}
      >
        {severities.map((severity, index) => (
          <MenuItem key={index} value={severity}>
            <span>
              {icons(severity)} {severity}
            </span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// Investigator column
function Investigator(props) {
  const { value, index, change, row, role, investigators } = props;
  return (
    <FormControl disabled={role === "admin" ? false : true}>
      <Select
        value={value}
        onChange={event => {
          const values = {
            id: row[0],
            type: "investigator",
            value: event.target.value
          };
          if (event.target.value === value) return;
          if (fetchData(values, "investigator"))
            change(event.target.value, index);
        }}
        style={{ fontSize: "inherit" }}
      >
        {investigators.map((investigator, index) => (
          <MenuItem key={index} value={investigator}>
            {investigator}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// document upload
function FileUpload(props) {
  const { value, index, change, row, rawData, role } = props;
  const [pathName, setpathName] = useState(
    rawData.report !== undefined ? rawData.report.path : ""
  );
  return (
    <>
      <input
        disabled={role === "admin" ? true : false}
        type="file"
        accept=".pdf,.doc,.docx,.zip,.rar,.7zip"
        id={`upload-input-${index}`}
        style={{ display: "none" }}
        onChange={event => {
          const formData = new FormData();
          formData.append(
            "report",
            event.target.files[0],
            event.target.files[0].name
          );
          formData.append("id", row[0]);
          fetch("/api/update-ticket/document", {
            method: "POST",
            body: formData
          })
            .then(res => {
              if (!res.ok)
                toast.error("Failed to connect to server", {
                  position: toast.POSITION.BOTTOM_CENTER
                });
              return res;
            })
            .then(res => res.json())
            .then(data => {
              // notification
              if (Boolean(data)) {
                toast.success("Report uploaded", {
                  position: toast.POSITION.BOTTOM_CENTER
                });
              } else {
                toast.error("Failed to upload report", {
                  position: toast.POSITION.BOTTOM_CENTER
                });
              }
            })
            .then(() => {
              console.log(row[0]);
              fetch(`/api/ticket/${row[0]}`)
                .then(res => res.json())
                .then(ticket => {
                  change(ticket[0].report.name, index);
                  setpathName(ticket[0].report.path);
                });
            });

          /* change(event.target.files[0].name, index); */
        }}
      />
      <label htmlFor={`upload-input-${index}`}>
        <IconButton
          key={`upload-button-${index}`}
          color="primary"
          aria-label="upload document"
          component="span"
          disabled={role === "admin" ? true : false}
        >
          <CloudUploadIcon disabled={role === "admin" ? true : false} />
        </IconButton>
      </label>
      {rawData.report && rawData.report.path ? (
        <a href={`http://localhost:3001/${pathName}`} download={true}>
          <span>{value}</span>
        </a>
      ) : (
          <span>{value}</span>
        )}
    </>
  );
}

// Email option column
function EmailOption(props) {
  // open dialog popup
  const [open, setOpen] = React.useState(false);
  // the type : "auto", "comment", "customize"
  const [type, setType] = React.useState("");
  // message of comment
  const [message, setMessage] = React.useState("");
  const getMessage = message => {
    setMessage(message);
  };
  // content of meail editor: customize option
  const [editorState, setEditor] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditor(editorState);
  };

  // get the data from props
  const { value, index, change, row, role } = props;
  const options = ["auto", "comment", "customize"];

  // send button on dialog popup
  const handleSend = () => {
    var data;
    setOpen(false);
    console.log(type);
    if (type === "customize")
      data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    else if (type === "comment") data = message;

    // values to send to server
    const values = {
      id: row[0],
      type: "emailOption",
      value: { type: type, data: data }
    };
    if (fetchData(values, "emailOption")) {
      console.log("true condition");
      change(type, index);
    }
  };

  const handleClose = () => {
    console.log("Popup closed.");
    setOpen(false);
  };

  let disable = false;
  // specify category to restric the severity change
  if (role === "investigator") disable = true;
  return (
    <>
      <FormControl disabled={role === "admin" ? false : true}>
        <Select
          value={value}
          disabled={disable}
          onChange={event => {
            setType(event.target.value);
            if (event.target.value !== "auto") {
              setOpen(true);
            } else {
              const values = {
                id: row[0],
                type: "emailOption",
                value: { type: "auto", data: "" }
              };
              if (event.target.value === "auto") return
              if (fetchData(values, "emailOption")) change("auto", index);
            }
          }}
          style={{ fontSize: "inherit" }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              <span>{option}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CommentDialog
        open={open}
        handleClose={() => handleClose}
        handleSend={() => handleSend}
        getMessage={getMessage}
        type={type}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
}

// Dialpg Dialog
function CommentDialog(props) {
  // dialog contetn
  const content = () => {
    if (props.type === "comment")
      return (
        <>
          <DialogContentText>
            Enter a comment to append to the automated email that will be sent
            to the complainant upon ticket.
          </DialogContentText>
          <TextField
            onChange={e => props.getMessage(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="email"
            fullWidth
          />
        </>
      );
    else if (props.type === "customize")
      return (
        <>
          <DialogContentText>
            Fully customize the email that will be sent to the complainant upon
            ticket resolution.
          </DialogContentText>{" "}
          <MailEditor
            editorState={props.editorState}
            onEditorStateChange={props.onEditorStateChange}
          />
          ;
        </>
      );
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Email Options</DialogTitle>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSend()} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Rich Text Editor
function MailEditor(props) {
  return (
    <div>
      <Editor
        editorState={props.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={props.onEditorStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(props.editorState.getCurrentContent()))}
      />
    </div>
  );
}

// fetch data to server
function fetchData(values, type) {
  var success, fail, err;
  switch (type) {
    case "emailOption":
      success = "Email options updated";
      fail = "Failed to update email options";
      err = "Failed to connect to server";
      break;
    case "investigator":
      success = "Investigator assigned";
      fail = "Failed to assign investigator";
      err = "Failed to connect to server";
      break;
    case "severity":
      success = "Severity updated";
      fail = "Failed to update severity";
      err = "Failed to connect to server";
      break;
    case "status":
      success = "Status updated";
      fail = "Failed to update status";
      err = "Failed to connect to server";
      break;
    default:
  }

  return fetch("/api/update-ticket", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(data => {
      // notification
      if (Boolean(data)) {
        toast.success(success, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        // change the value of table row
        return true;
      } else {
        toast.error(fail, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        return false;
      }
    })
    .catch(error => {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      console.log(error);
      return false;
    });
}

export default TicketFilter;
