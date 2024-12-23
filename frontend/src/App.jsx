// I have used react-router-dom for client side routing: the BrowserRouter, Routes and Route.
// four custom components: StudentTable, CreateStudent, EditStudent and ViewDetails

// 1. /: renders the StudentTable component
// 2. /student/create: renders the CreateStudent component
// 3. /student/edit/:studentId: renders the EditStudent component, passing a studentId parameter
// 4. /student/view/:studentId: renders the ViewDetails component, passing a studentId parameter

import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentTable from "./components/StudentTable";
import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent";
import ViewDetails from "./components/ViewDatails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:studentId" element={<EditStudent />} />
        <Route path="/student/view/:studentId" element={<ViewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
