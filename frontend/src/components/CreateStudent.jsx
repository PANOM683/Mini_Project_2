import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// useState hook to initalize several state variables: id, name, place, phone, validation and navigate.

export default function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  // the handleSubmit function:
  // 1. Prevents the default form submission behavior.
  // 2. Creates a studentData object with the entered values.
  // 3. Sends a POST request to the server to create a new student record.
  // 4. Navigates back to the root route ("/") after creating the record.

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, place, phone };
    console.log(studentData);
    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => res.json())
      .then((data) => alert("Student Added Successfully"));
    navigate("/").catch((err) => console.log(err.message));
  };

  // the form has submit button and back button
  // when the users submits the form, the handleSubmit function sends a "POST" request to the server to create a new student record.
  // the request includes the studentData object with the entered values.
  // and the server responds with a JSON object, which is logged to the console.

  return (
    <div className="container">
      <h2>Create New Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlfor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          required
          onChange={(e) => setId(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {id.length === 0 && validation && (
          <span className="error">ID is required</span>
        )}

        <label htmlfor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && (
          <span className="error">Name is required</span>
        )}

        <label htmlfor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={place}
          required
          onChange={(e) => setPlace(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {place.length === 0 && validation && (
          <span className="error">Place is required</span>
        )}

        <label htmlfor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {phone.length === 0 && validation && (
          <span className="error">Phone is required</span>
        )}

        <div>
          <button className="btn btn-save">Save</button>
          <Link to="/" className="btn btn-back">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
