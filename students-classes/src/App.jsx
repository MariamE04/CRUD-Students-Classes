import './styles/App.css'
import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import StudentList from "./components/StudentList.jsx";
import { fetchData } from './utils/fetchData';


function App() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const APIURL = "http://localhost:3000/students";
  const APIURLC = "http://localhost:3000/classes";

  function getStudents(callback){
    // Fetch data
    fetchData(APIURL, callback)

    // update data useStates (setStudents)
  }

  function getClasses(callback){
  fetchData(APIURLC, callback);
}


  useEffect(()=> {
   // get all Students
    getStudents((data) => setStudents(data))
     getClasses((data) => setClasses(data));
  }, []);

  return (
    <div>
        <h1>Students DB</h1>
      <PersonForm/>

       <StudentList students={students} classes={classes}/>
    </div>
  )
}

export default App
