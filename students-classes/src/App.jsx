  import './styles/App.css' // Importerer CSS-styling
  import { useState, useEffect } from 'react'; // React hooks
  import PersonForm from './components/PersonForm'; // Formular-komponent
  import StudentList from "./components/StudentList.jsx"; // Liste-komponent
  import { fetchData } from './utils/fetchData'; // Egen fetch-funktion

  const blankStudent = { name: "", age: "", email: "", classes: [] }; // Tom student-skabelon

  function App() {
    const [students, setStudents] = useState([]); // Liste af students
    const [classes, setClasses] = useState([]); // Liste af classes
    const [studentToEdit, setStudentToEdit] = useState(blankStudent); // Den student der redigeres

    const APIURL = "http://localhost:3000/students"; // URL til students-API
    const APIURLC = "http://localhost:3000/classes"; // URL til classes-API


    function editStudent(student){
        setStudentToEdit(student);  // Sætter den student der skal redigeres
    }


    function mutateStudent(student){ // Bestemmer om PUT eller POST
      if(student.id){ // Hvis student har id → opdater
        // PUT
        updateStudent(student);
      } else { // Ellers opret
        // POST
        createStudent(student)
    }
  }

  function updateStudent(student){ // PUT request
  const idStr = String(student.id); // Laver id til string
  fetchData(
    `${APIURL}/${idStr}`, // API endpoint
    () => setStudents(prev => // Opdaterer student i state
      prev.map(s => String(s.id) === idStr ? student : s)
    ),
    "PUT", // HTTP-metode
    student // Body data
  );
}



  function createStudent(student){ // POST request
    console.log("create")
      fetchData(
        APIURL, // API endpoint
        (student) =>  setStudents([...students, student]), // Tilføj ny student
        'POST', // HTTP-metode
        student); // Body data
  }


    function getStudents(callback){ // Henter alle students
      // Fetch data
      fetchData(APIURL, callback)

      // update data useStates (setStudents)
    }
 
    function getClasses(callback){ // Henter alle classes
    fetchData(APIURLC, callback);
  }


    function deleteStudentById(studentId){ // Slet student
      const idStr = String(studentId);

  fetchData(
    `${APIURL}/${idStr}`,
    () => {
      setStudents(prev => prev.filter((s) => String(s.id) !== idStr)); // Fjerner student fra state
    },
    "DELETE"
  );
}


    useEffect(()=> { // Kører ved første load
    // get all Students/ classes
      getStudents((data) => setStudents(data))
      getClasses((data) => setClasses(data));
    }, []);

    return (
      <div>
          <h1>Students DB</h1>
        <PersonForm blankStudent={blankStudent} // Tom student
        studentToEdit={studentToEdit}           // Den der redigeres
        mutateStudent={mutateStudent}           // POST/PUT funktion
        onReset={() => setStudentToEdit(blankStudent)} // Reset handling
        />

        <StudentList students={students}    // Liste af students
        classes={classes}                   // Liste af classes
        deleteStudentById={deleteStudentById} // Slet funktion  
        editStudent={editStudent}/> 
      </div>
    )
  }

  export default App
