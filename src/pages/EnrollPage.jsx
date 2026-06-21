import { useNavigate } from "react-router-dom";
import EnrollForm from "../components/EnrollForm";

const EnrollPage = ({ tracks, onEnroll }) => {
  const navigate = useNavigate();

  const handleEnroll = (newStudent) => {
    onEnroll(newStudent);
    navigate("/");
  };

  return <EnrollForm tracks={tracks} onEnroll={handleEnroll} />;
};

export default EnrollPage;
