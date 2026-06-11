const StudentCard = ({
  student: {
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
        {firstName} {lastName}
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
