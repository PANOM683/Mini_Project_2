// the Student component is a functional component which,
// used UseState hook to initialize a state variable students with an empty strin.

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import EditStudent from "./EditStudent";

// Three navigation functions are defined:
// 1. DisplayDetails: navigates to the /student/view/${id} route when called.
// 2. EditDetails: navigates to the /student/edit/${id} route when called.
// 3. RemoveDetails: deletes a student record from the server and reloads the page when called.

export default function StudentTable() {
  const [students, setStudents] = useState("");
  const navigate = useNavigate();
  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  };

  const EditDetails = (id) => {
    navigate("/student/edit/" + id);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch("http://localhost:8000/students/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed Student Successfully");
          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    }
  };

  // The useEffect:
  // 1. Fetches data from the URL http://localhost:8000/students.
  // 2. Parses the response as JSON.
  // 3. Updates the students state with the received data.
  // 4.Catches any errors and logs them to the console.

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  // each row represents a student record and displays the corresponding data.
  // the actions column contains buttons for viewing, editing, and deleting the student record.

  // 1. The view button calls the DisplayDetails function when click.
  // 2. The edit button calls the EditDetails function when click.
  // 3. The delete button calls the RemoveDetails function when click.

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-add">
          Add new Student
        </Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      onClick={() => DisplayDetails(item.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        EditDetails(item.id);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        RemoveDetails(item.id);
                      }}
                      // the RemoveDetails function prompts the user to confirm deletion
                      // if confirmed, sends a DELETE request to the server to delete the student record
                      // Reloads the Page
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            ;
          </tbody>
        </table>
      </div>
    </div>
  );
}
