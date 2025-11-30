import { useState, useEffect } from "react";

function PersonForm({blankStudent, studentToEdit, mutateStudent, onReset}){
  const [student, setStudent] = useState({...studentToEdit}); // Lokal kopi af student
  
  useEffect(() => {
  setStudent(studentToEdit) // Opdaterer formular når der vælges ny student
}, [studentToEdit]);

  function handleChange(event){ // Håndtering af inputs
        const value = event.target.value; // Input-værdi
        const name = event.target.id;   // Input-id som bruges som key
        setStudent({...student, [name]: value}); // Opdater state
    
  }

  function handleSubmit(event){ // Når der trykkes submit
    event.preventDefault();

    console.log("submit", student)
    mutateStudent(student); 
    // callback function fra APP.jsx, som enten indsætter en ny student
    // eller opdater (hvis id != "")
  }

  return(
    <div>
      <p>Add/Edit student</p>
      {JSON.stringify(student)}
     <form onSubmit={handleSubmit}>
        {student.id && (  // Hvis student har id → vis readOnly felt
        <> 
        <label htmlFor="id">Id</label>
        <input id="id" type="text" readOnly value={student.id}/> 
        </>
      )}
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Enter name" value={student.name} onChange={handleChange} />
        <label htmlFor="age">Age</label>
        <input id="age" type="number" min="1" max="120" placeholder="Enter age" value={student.age} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter email" value={student.email} onChange={handleChange} />
        <label htmlFor="class">Class</label>

 <select
  id="classes"
  value={student.classes[0] || ""}
  onChange={(e) => setStudent({...student, classes: [e.target.value]})}
>
  <option value="">Select class</option>
  <option value="1">Math 101</option>
  <option value="2">History 201</option>
</select>


  <button>Update</button>
 <button type="button" onClick={ // Reset-knap
  () => {setStudent(blankStudent); // Tømmer formularen
  onReset();    // Nulstiller studentToEdit
  }}> Reset</button> 


</form>
</div>
    );
}

export default PersonForm;