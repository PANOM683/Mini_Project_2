// useParms from react-router-dom to access routes parameters
// also use link from react-router-dom for creating links between routes

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// useParams hooks to access the studentID parameter from the route
// I used useState hook to initialize a state variable studentData with an empty object

export default function ViewDetails() {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({});

  // 1. Fetches data from the URL http://localhost:8000/students/${studentId}.
  // 2. Parses the response as JSON.
  // 3. Updates the studentData state with the received data.
  // 4. Catches any errors and logs them to the console.
  // 5. the empty dependency array [] ensures that the useEffect hook runs only once, when the component mounts

  useEffect(() => {
    fetch("http://localhost:8000/students/" + studentId)
      .then((res) => res.json())
      .then((data) => setStudentData(data))
      .catch((err) => console.log(err.message));
  }, []);
  // rendered a container with a heading
  // the details section is only rendered if studentData is truthy.
  // I used link component to go back to previous page

  return (
    <div className="container">
      <h1>View Student Details</h1>
      {studentData && (
        <div className="details">
          <p>
            <strong>ID: </strong>
            {studentData.id}
          </p>
          <p>
            <strong>Name: </strong>
            {studentData.name}
          </p>
          <p>
            <strong>Place: </strong>
            {studentData.place}
          </p>
          <p>
            <strong>Phone: </strong>
            {studentData.phone}
          </p>
        </div>
      )}
      <Link to="/" class="btn btn-back">
        Back
      </Link>
    </div>
  );
}
