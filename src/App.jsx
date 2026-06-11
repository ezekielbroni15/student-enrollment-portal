import { useCallback, useEffect, useState } from "react";
import "./App.css";

import ClassButton from "./components/ClassButton";
import EnrollForm from "./components/EnrollForm";
import Header from "./components/Header";
import StatusMessage from "./components/StatusMessage";
import StudentList from "./components/StudentList";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const SEED_STUDENTS = [
  {
    id: "seed-1",
    firstName: "Amara",
    lastName: "Johnson",
    email: "amara@kodecamp.dev",
    track: "Frontend",
    score: 92,
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "seed-2",
    firstName: "Chidi",
    lastName: "Okafor",
    email: "chidi@kodecamp.dev",
    track: "Backend",
    score: 67,
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

const getAverage = (list) => {
  if (list.length === 0) return 0;

  const totalScore = list.reduce(
    (total, { score }) => total + Number(score),
    0,
  );

  return totalScore / list.length;
};

const getRandomScore = () => Math.floor(Math.random() * 61) + 40;

const loadRoster = async () => {
  const response = await fetch("https://randomuser.me/api/?results=6&nat=us,gb");

  if (!response.ok) {
    throw new Error(`Roster request failed with status ${response.status}`);
  }

  const data = await response.json();
  const apiStudents = data.results.map(
    ({ login, name, email, picture }, index) => ({
      id: login.uuid,
      firstName: name.first,
      lastName: name.last,
      email,
      avatar: picture.thumbnail,
      track: TRACKS[index % TRACKS.length],
      score: getRandomScore(),
      isActive: true,
    }),
  );

  return [...SEED_STUDENTS, ...apiStudents];
};

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoster = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const roster = await loadRoster();
      setStudents(roster);
    } catch (fetchError) {
      setError(fetchError.message);
      setStudents(SEED_STUDENTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialRoster = async () => {
      try {
        const roster = await loadRoster();

        if (isMounted) {
          setStudents(roster);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
          setStudents(SEED_STUDENTS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialRoster();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEnroll = (newStudent) => {
    setStudents((currentStudents) => [newStudent, ...currentStudents]);
  };

  const averageScore = getAverage(students);

  return (
    <main className="app">
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={averageScore}
      />

      <EnrollForm tracks={TRACKS} onEnroll={handleEnroll} />

      {loading ? (
        <StatusMessage type="loading" />
      ) : (
        <>
          {error && <StatusMessage type="error" />}

          <StudentList students={students} title="Student Roster" getGrade={getGrade}>
            <p>{`End of roster — ${students.length} total`}</p>
          </StudentList>
        </>
      )}

      <section className="actions-panel" aria-label="Roster actions">
        <ClassButton
          title="Refresh Roster"
          className="secondary-button"
          onClick={fetchRoster}
        />
      </section>
    </main>
  );
};

export default App;
