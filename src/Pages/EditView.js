import React from "react";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Container, Typography } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function EditView() {
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();

  const [booksData, setBooksData] = useState([]);
  const [open1, setOpen1] = useState();
  const [bookname, setBookName] = useState();
  const [authorname, setAuthorName] = useState();
  const [borrowedby, setBorrowedBy] = useState();
  const [dateofborrow, setDateOfBorrow] = useState();
  const [returndate, setReturnDate] = useState();

  useEffect(() => {
    callStudents();
    callBooks();
    updateStudent();
    updateBooks();
  }, []);

  async function callStudents() {
    const students = await fetch("/students");
    const data = await students.json();
    console.log("here", data);
    setStudentData(data);
  }

  async function callBooks() {
    const books = await fetch("/books");
    const data = await books.json();
    console.log("here books", data);
    setBooksData(data);
  }

  async function updateStudent() {
    await fetch("/students/" + `${id}`, {
      method: "PUT",
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setOpen(false);
        console.log(json);
        callStudents();
      });
  }

  async function updateBooks() {
    await fetch("/books/" + `${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            book_name: bookname,
            author: authorname,
            borrowed_by: borrowedby,
            date_of_borrow: dateofborrow,
            return_date: returndate
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        setOpen1(false);
        console.log(json);
        callBooks();
    })
  }

  return (
    <div>
      <Box style={{ margin: "35px" }}>
        <Container maxWidth="sm">
          <Typography
            style={{
              fontWeight: "bolder",
              fontSize: "40px",
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Edit Page
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Go to List Page
          </Button>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Students Table
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((students) => (
                  <TableRow key={students.id}>
                    <TableCell align="left">{students.first_name}</TableCell>
                    <TableCell align="left">{students.last_name}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <EditIcon
                        color="primary"
                        onClick={() => {
                          setId(students.id);
                          setFirstName(students.first_name);
                          setLastName(students.last_name);
                          setOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Box style={{ margin: "35px" }}>
        <Container>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Books Table
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Book Name</TableCell>
                  <TableCell align="left">Author Name</TableCell>
                  <TableCell align="left">Borrowed By</TableCell>
                  <TableCell align="left">Date of Borrow</TableCell>
                  <TableCell align="left">Return Date</TableCell>
                  <TableCell align="left">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booksData.map((books) => (
                  <TableRow key={books.id}>
                    <TableCell align="left">{books.book_name}</TableCell>
                    <TableCell align="left">{books.author}</TableCell>
                    <TableCell align="left">{books.borrowed_by}</TableCell>
                    <TableCell align="left">{books.date_of_borrow}</TableCell>
                    <TableCell align="left">{books.return_date}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <EditIcon
                        color="primary"
                        onClick={() => {
                          setId(books.id);
                          setBookName(books.book_name);
                          setAuthorName(books.author);
                          setBorrowedBy(books.borrowed_by);
                          setDateOfBorrow(books.date_of_borrow);
                          setReturnDate(books.return_date);
                          setOpen1(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit first name and last name of student.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateStudent();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open1}
        onClose={() => {
          setOpen1(false);
        }}
      >
        <DialogTitle>Edit Books</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Book Details.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Book Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={bookname}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
          ></TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Author"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={authorname}
            onChange={(e) => {
              setAuthorName(e.target.value);
            }}
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Borrowed By"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={borrowedby}
            onChange={(e) => {
              setBorrowedBy(e.target.value);
            }}
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="borrowtime"
            label="Date of Borrow"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={dateofborrow}
            onChange={(e) => {
              setDateOfBorrow(e.target.value);
            }}
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="returntime"
            label="Return Date"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={returndate}
            onChange={(e) => {
              setReturnDate(e.target.value);
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen1(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateBooks();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditView;
