import React from "react";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Container, Typography, Modal, Fade, Backdrop } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function EditView() {
  const [studentData, setStudentData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    callStudents();
    callBooks();
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

  return (
    <div>
      <Box style={{ margin: "35px" }}>
        <Typography style={{ fontWeight: "bolder" }}>
          Current Page: Edit Page for Books and Students
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go to List Page
        </Button>
        <Container maxWidth="sm">
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
                    <TableCell align="left"> <EditIcon onClick={()=> {setOpen(true)}} /></TableCell>
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
                    <TableCell align="left"> <EditIcon onClick={()=> {setOpen(true)}} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>{setOpen(false)}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
        </Container>
      </Box>
    </div>
  );
}

export default EditView;
