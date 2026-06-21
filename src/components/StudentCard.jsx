import { Link } from "react-router-dom";

const StudentCard = ({
  student: {
    id,
    firstName,
    lastName,
    email,
    track,
    score,
    isActive,
    avatar,
  },
  getGrade,
}) => {
  return (
    <article className={`student-card ${isActive ? "" : "inactive-card"}`}>
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className="avatar"
      />

      <h3>
        <Link to={`/students/${id}`} className="student-name-link">
          {firstName} {lastName}
        </Link>
      </h3>

      <p>{`${track} · ${email}`}</p>

      <p>
        {`Score: ${score} (Grade: ${getGrade(score)}) · `}
        <span className={isActive ? "active-label" : "inactive-label"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </p>
    </article>
  );
};

export default StudentCard;
