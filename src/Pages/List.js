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
import { Link } from "react-router-dom";

function List() {
  const [studentData, setStudentData] = useState([]);
  const [booksData, setBooksData] = useState([]);

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
            List Page
          </Typography>
          <Button variant="contained" component={Link} to="/EditView">
            Go to Edit Page
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
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((students) => (
                  <TableRow key={students.id}>
                    <TableCell align="left">{students.first_name}</TableCell>
                    <TableCell align="left">{students.last_name}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
}

export default List;
