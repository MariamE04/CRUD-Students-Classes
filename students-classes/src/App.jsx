  import './styles/App.css'
  import { useState, useEffect } from 'react';
  import PersonForm from './components/PersonForm';
  import StudentList from "./components/StudentList.jsx";
  import { fetchData } from './utils/fetchData';

  const blankStudent = { name: "", age: "", email: "", classes: [] };

  function App() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [studentToEdit, setStudentToEdit] = useState(blankStudent);

    const APIURL = "http://localhost:3000/students";
    const APIURLC = "http://localhost:3000/classes";


    function editStudent(student){
        setStudentToEdit(student);
    }


    function mutateStudent(student){
      if(student.id){
        // PUT
        updateStudent(student);
      } else {
        // POST
        createStudent(student)
    }
  }

  function updateStudent(student){
  const idStr = String(student.id);
  fetchData(
    `${APIURL}/${idStr}`,
    () => setStudents(prev =>
      prev.map(s => String(s.id) === idStr ? student : s)
    ),
    "PUT",
    student
  );
}



  function createStudent(student){
    console.log("create")
      fetchData(
        APIURL,
        (student) =>  setStudents([...students, student]),
        'POST',
        student);
  }


    function getStudents(callback){
      // Fetch data
      fetchData(APIURL, callback)

      // update data useStates (setStudents)
    }

    function getClasses(callback){
    fetchData(APIURLC, callback);
  }


    function deleteStudentById(studentId){
  const idStr = String(studentId);

  fetchData(
    `${APIURL}/${idStr}`,
    () => {
      setStudents(prev => prev.filter((s) => String(s.id) !== idStr));
    },
    "DELETE"
  );
}


    useEffect(()=> {
    // get all Students
      getStudents((data) => setStudents(data))
      getClasses((data) => setClasses(data));
    }, []);

    return (
      <div>
          <h1>Students DB</h1>
        <PersonForm blankStudent={blankStudent}
        studentToEdit={studentToEdit}
        mutateStudent={mutateStudent} 
        onReset={() => setStudentToEdit(blankStudent)}
        />

        <StudentList students={students} 
        classes={classes}
        deleteStudentById={deleteStudentById}
        editStudent={editStudent}/>
      </div>
    )
  }

  export default App
