import ClassButton from "../components/ClassButton";
import Header from "../components/Header";
import StatusMessage from "../components/StatusMessage";
import StudentList from "../components/StudentList";

const HomePage = ({
  students,
  loading,
  error,
  averageScore,
  getGrade,
  onRefresh,
}) => {
  return (
    <>
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={averageScore}
      />

      {loading ? (
        <StatusMessage type="loading" />
      ) : (
        <>
          {error && <StatusMessage type="error" />}

          <StudentList
            students={students}
            title="Student Roster"
            getGrade={getGrade}
          >
            <p>{`End of roster — ${students.length} total`}</p>
          </StudentList>
        </>
      )}

      <section className="actions-panel" aria-label="Roster actions">
        <ClassButton
          title="Refresh Roster"
          className="secondary-button"
          onClick={onRefresh}
        />
      </section>
    </>
  );
};

export default HomePage;
