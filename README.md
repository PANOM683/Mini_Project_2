The video - Simple Click on View Raw And it will Download.

Student Management System 

- First For Frontend to run View App.jsx or StudentTable.jsx and Save then run - npm run dev to open the Port.
  So then it will run each file in components to the UI.

- Second is to run the db.Json server - json-server --watch db.json --port 8000
  It's store Student Data

- Third is to run the Back End - npm start for backend server
  this gets the student data from the db.json.


This is a simple student management system built with Node.js and Express.js. The system allows users to create, read, update, and delete student records.

Features -
1. Create new student records
2. Read student records
3. Update existing student records
4. Delete student records

Four Components - 
1. CreateStudent.jsx - Which lets you create student as many as you like with id, phone, name, place. With storing process in db.json server.
2. EditStudent.jsx - This is to edit student if they put there name wrong or anything and it has a pop up the users has successfully edited.
3. StudentTable.jsx - In this you see the table with student info and View, Edit And Delete Buttons.
4. ViewDetails.jsx - This is for to view details of each student and view them as any id in url.

Backend Server

1. It is to get all student data from fronted/db.json
2. It also has get the get student by Id. 
