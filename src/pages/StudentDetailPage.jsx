import { Link, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";

const StudentDetailPage = ({ students, loading, getGrade }) => {
  const { id } = useParams();
  const student = students.find((currentStudent) => currentStudent.id === id);

  if (loading) {
    return <StatusMessage type="loading" />;
  }

  if (!student) {
    return (
      <section className="page-panel centered-panel">
        <h1>Student not found</h1>
        <p>The student you are looking for is not in the current roster.</p>
        <Link to="/" className="text-link">
          Back to Home
        </Link>
      </section>
    );
  }

  const {
    firstName,
    lastName,
    email,
    track,
    score,
    isActive,
    avatar,
  } = student;

  return (
    <section className="page-panel student-detail">
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className="detail-avatar"
      />

      <div>
        <p className="detail-kicker">Student Profile</p>
        <h1>{`${firstName} ${lastName}`}</h1>

        <dl className="detail-list">
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Track</dt>
            <dd>{track}</dd>
          </div>
          <div>
            <dt>Score</dt>
            <dd>{score}%</dd>
          </div>
          <div>
            <dt>Grade</dt>
            <dd>{getGrade(score)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className={isActive ? "active-label" : "inactive-label"}>
              {isActive ? "Active" : "Inactive"}
            </dd>
          </div>
        </dl>

        <Link to="/" className="text-link">
          Back to Roster
        </Link>
      </div>
    </section>
  );
};

export default StudentDetailPage;
