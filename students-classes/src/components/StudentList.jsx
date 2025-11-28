function StudentList({students}){
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
      <td>{student.className}</td>
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