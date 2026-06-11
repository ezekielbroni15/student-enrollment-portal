import StudentCard from "./StudentCard";

const StudentList = ({
  students,
  title = "All Students",
  children,
  getGrade,
}) => {
  return (
    <section className="student-list">
      <h2>{title}</h2>

      {students.length > 0 ? (
        <div className="card-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              getGrade={getGrade}
            />
          ))}
        </div>
      ) : (
        <p>No students to display yet</p>
      )}

      <div className="footer-message">{children}</div>
    </section>
  );
};

export default StudentList;
