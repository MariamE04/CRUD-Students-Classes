import { useState } from "react";

function PersonForm({blankStudent}){
  const [student, setStudent] = useState({});
  
  return(
    <div>
      <p>Add/Edit student</p>
     <form>
        <label htmlFor="id">Id</label>
        <input id="id" type="number" readOnly placeholder="id" value={student.id} />
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Enter name" value={student.name} />
        <label htmlFor="age">Age</label>
        <input id="age" type="number" min="1" max="120" placeholder="Enter age" value={student.age} />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter email" value={student.email} />
        <label htmlFor="class">Class</label>

  <select id="class">
    <option value="Math 101">Math 101</option>
    <option value="History 201">History 201</option>
  </select>

  <button>Update</button>
   <button onClick={() => setStudent(blankStudent)}>Reset</button>

</form>
</div>
    );
}

export default PersonForm;