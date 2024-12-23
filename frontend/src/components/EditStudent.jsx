import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// this use UseState hook to initialize several state variables: id, name, place, phone, validation and navigate
// this will store the student data fetched from the server and the validdation status.

export default function EditStudent() {
  const { studentId } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();
  //const [studentData, setStudentData] = useState({});

  // 1. Fetches data from the URL http://localhost:8000/students/${studentId}.
  // 2. Parses the response as JSON.
  // 3. Updates the state variables with the received data.

  useEffect(() => {
    fetch("http://localhost:8000/students/" + studentId)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // the component defines a handleSubmitfunction that handles form submission
  // the function:
  // 1. Prevents the default form submission behavior.
  // 2. Creates a studentData object with the updated values.
  // 3. Sends a PUT request to the server to update the student data.
  // 4.Navigates back to the root route ("/") after updating the data.

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, place, phone };

    fetch("http://localhost:8000/students/" + studentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => res.json())
      .then((data) => alert("Student Data Updated Successfully"));
    navigate("/").catch((err) => console.log(err.message));
  };

  // the component renders a form with input fields for the student data.
  // an onChange event handler that updates the state variables.
  // the form also has a submit button and a back link.
  // the component uses a validation state variable to track whether the form has been validated.
  //When the user clicks on an input field, the onMouseDown event handler sets the validation state variable to true.

  return (
    <div className="container">
      <h2>Edit Student Details</h2>
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
          id="Place"
          name="Place"
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
          <button className="btn btn-save">Update</button>
          <Link to="/" className="btn btn-back">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
