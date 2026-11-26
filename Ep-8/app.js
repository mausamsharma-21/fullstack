
const express = require("express");
const app = express();

const PORT = 3000;
// Set EJS as template engine
app.set("view engine", "ejs");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Temporary student data
let students = [
  { id: 1, name: "Rahul", course: "BCA" },
  { id: 2, name: "Priya", course: "B.Tech" },
  { id: 3, name: "Amit", course: "MCA" }
];

// ROUTE 1: GET - Home page
app.get("/", (req, res) => {
  res.render("index");
});

// ROUTE 2: GET - Display all students
app.get("/students", (req, res) => {
  res.render("students", { students });
});

// ROUTE 3: GET - Display add student form
app.get("/add-student", (req, res) => {
  res.render("add-student");
});

// ROUTE 4: POST - Add a new student
app.post("/add-student", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).send("Name and course are required.");
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1,
    name,
    course
  };

  students.push(newStudent);

  res.redirect("/students");
});

// ROUTE 5: GET - Display individual student details
app.get("/student/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).send("Student not found.");
  }

  res.render("student-details", { student });
});

// ROUTE 6: POST - Delete a student
app.post("/delete-student/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter(student => student.id !== id);

  res.redirect("/students");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
