import express from "express";
import fs from "fs";

const app = express();
const port = 3001;

// Middleware to handle JSON requests
app.use(express.json());

// GET route to retrieve all students
app.get("/students", (req, res) => {
  fs.readFile("../frontend/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        const students = jsonData.students;
        res.json(students);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });
});

// POST route to create a new student
app.post("/students", (req, res) => {
  const newStudent = req.body;

  fs.readFile("../frontend/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        const students = jsonData.students;

        // Add the new student to the existing data
        students.push(newStudent);

        // Write the updated data back to the file
        fs.writeFile("../frontend/db.json", JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Error writing file" });
          } else {
            res.json(newStudent);
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });
});

app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;

  // Read the data from the db.json file
  fs.readFile("../frontend/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        const students = jsonData.students;

        // Find the student with the matching ID
        const student = students.find((student) => student.id === studentId);

        if (student) {
          res.json(student);
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });
});

// PUT route to update a student
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;

  fs.readFile("../frontend/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        const students = jsonData.students;

        // Find the student with the matching ID
        const index = students.find((student) => student.id === parseInt(id));

        if (index !== -1) {
          // Update the student with the new data
          students[index] = updatedStudent;

          // Write the updated data back to the file
          fs.writeFile(
            "../frontend/db.json",
            JSON.stringify(jsonData),
            (err) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: "Error writing file" });
              } else {
                res.json(updatedStudent);
              }
            }
          );
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });
});

// DELETE route to delete a student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("../frontend/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        const students = jsonData.students;

        // Find the student with the matching ID
        const index = students.find((student) => student.id === parseInt(id));

        if (index !== -1) {
          // Remove the student from the array
          students.splice(index, 1);

          // Write the updated data back to the file
          fs.writeFile(
            "../frontend/db.json",
            JSON.stringify(jsonData),
            (err) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: "Error writing file" });
              } else {
                res.json({ message: "Student deleted" });
              }
            }
          );
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
