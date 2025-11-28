function StudentList({ students, classes}){

  function getClassNameById(id) {
  const found = classes.find(c => c.id == id);

  if (found) {
    return found.name;
  } else {
    return "Unknown";
  }
}


    return(
        <div>
            <table className="table table-striped">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Age</th>
      <th>Email</th>
      <th>Classes</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
      {students.map(student => (
         <tr key={crypto.randomUUID()}>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.email}</td>
      <td>{student.classes.map(cid => getClassNameById(cid)).join(", ")}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
      )
  )}
  
  </tbody>
</table>
        </div>
    );
}

export default StudentList;